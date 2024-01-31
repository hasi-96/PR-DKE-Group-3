import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class IndexDBService {
  private datenbankversion = 5;

  /**Speichert ein Datenobjekt in einem angegebenen Object Store innerhalb der IndexedDB-Datenbank 'IMDatabase'.
   * Falls der Object Store nicht existiert, wird er beim Datenbank-Upgrade erstellt.
   * Die Methode weist dem Datenobjekt eine neue, eindeutige ID zu, indem sie die niedrigste vorhandene ID im Store sucht und diese um eins verringert.
   */
  public saveToIndexedDB(dataObject: any, storeName: string) {
    let db: IDBDatabase;
    const requestDB = indexedDB.open('IMDatabase', this.datenbankversion);

    requestDB.onupgradeneeded = event => {
      db = requestDB.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, {keyPath: 'id'});
      }
    };

    requestDB.onsuccess = event => {
      db = requestDB.result;

      this.getLowestId(db, storeName).then(value => {
        dataObject.id = value - 1;
        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.add(dataObject);

        request.onsuccess = () => {
          console.log(`Data added to ${storeName}`, request.result);
        };

        request.onerror = () => {
          console.error(`Error adding data to ${storeName}`, request.error);
        };
      }).catch(error => {
        console.log('getLowestId Error:', error);
      });
    };

    requestDB.onerror = event => {
      console.error('IndexedDB error:', requestDB.error);
    };
  }

  /** Ermittelt die niedrigste ID in einem angegebenen Object Store der IndexedDB-Datenbank.
   * Die Methode durchläuft alle Einträge im Store mithilfe eines Cursors und vergleicht die IDs,
   * um die niedrigste zu finden. Die Methode wird typischerweise verwendet, um eine eindeutige ID
   * für neue Einträge zu generieren, indem die gefundene niedrigste ID um eins verringert wird.
   */
  public getLowestId(db: IDBDatabase, storeName: string): Promise<number> {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.openCursor();

      let lowestId: number = -1;

      request.onsuccess = event => {
        let cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
        if (cursor) {
          // Assuming the ID is a number and is the key of the store
          let currentId = cursor.key as number;

          if (lowestId === undefined || currentId < lowestId) {
            lowestId = currentId;
          }

          cursor.continue();
        } else {
          // No more entries, resolve the promise
          resolve(lowestId);
        }
      };

      request.onerror = () => {
        resolve(-1);
      };
    });
  }

  /**
   * Holt alle Datensätze aus einem spezifizierten Object Store einer IndexedDB-Datenbank.
   * Die Methode kehrt ein Observable zurück, das abonniert werden kann, um auf die Daten zuzugreifen.
   */
  public getAllFromStore(dbName: string, storeName: string): Observable<any[]> {
    return new Observable(observer => {
      const request = indexedDB.open(dbName);
      request.onerror = (event) => {
        observer.error('IndexedDB error: ' + request.error?.message);
      };

      request.onsuccess = (event) => {
        const db = request.result;

        const transaction = db.transaction(storeName, 'readonly');
        const store = transaction.objectStore(storeName);
        const allRecordsRequest = store.getAll();

        allRecordsRequest.onerror = (event) => {
          observer.error('Error reading from store: ' + allRecordsRequest.error?.message);
        };

        allRecordsRequest.onsuccess = (event) => {
          observer.next(allRecordsRequest.result);
          observer.complete();
        };
      };
    });
  }

  /**
   * Löscht ein Datenelement anhand seiner ID aus einem spezifizierten Object Store der IndexedDB-Datenbank 'IMDatabase'.
   */
  public deleteFromStore(storeName: string, id: number) {
    let db: IDBDatabase;
    const requestDB = indexedDB.open('IMDatabase', this.datenbankversion);

    requestDB.onsuccess = event => {
      db = requestDB.result;

      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const deleteRequest = store.delete(id);

      deleteRequest.onerror = event => {
        console.log(`Error deleting from ${storeName}: `, deleteRequest.error?.message);
      };

      deleteRequest.onsuccess = event => {
        console.log(`Data deleted from ${storeName}`);
      };
    };
  }

  /** Aktualisiert ein vorhandenes Datenelement oder fügt ein neues Datenelement in einen spezifizierten Object Store
   * der IndexedDB-Datenbank 'IMDatabase' ein. Die Methode verwendet die 'put'-Operation des Object Stores,
   * die ein Datenelement mit der angegebenen ID ersetzt, wenn es existiert, oder ein neues Element hinzufügt, wenn es nicht existiert.
   */
  public replaceInStore(dataObject: any, storeName: string) {
    let db: IDBDatabase;
    const requestDB = indexedDB.open('IMDatabase', this.datenbankversion);

    requestDB.onsuccess = event => {
      db = requestDB.result;

      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const updateRequest = store.put(dataObject);

      updateRequest.onerror = event => {
        console.log(`Error updating the ${storeName}`, updateRequest.error?.message);
      };

      updateRequest.onsuccess = event => {
        console.log(`Data updated in ${storeName}`);
      };
    };
  }
}
