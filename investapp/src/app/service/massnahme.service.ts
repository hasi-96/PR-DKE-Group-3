import {Injectable} from '@angular/core';
import {from, Observable, throwError, catchError} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Massnahme} from "../model/massnahme";
import {IndexDBService} from "./indexDB.service";

export interface Bauobjekt {
  id: number;
  name: string;
  bwtyp: string;
  status: string;
  baujahr: number;
  standort: string;
}

@Injectable({
  providedIn: 'root'
})
/**
 * MassnahmeService ist verantwortlich für das Abrufen, Hinzufügen, Aktualisieren und Löschen von
 * Maßnahmendaten und die Verwaltung von Bauobjektdaten. Bei Netzwerkfehlern werden die Daten stattdessen
 * in IndexedDB gespeichert und bei Wiederherstellung der Internetverbindung synchronisiert.
 */

export class MassnahmeService {
  public online: boolean;
  private apiUrl = 'http://localhost:8081/massnahme';

  public massnahmen$: Observable<any>;

  constructor(private http: HttpClient, private indexDBService: IndexDBService) {
    this.online = false;
    this.massnahmen$ = {} as Observable<any>;
  }

  getBauobjekteID(): Observable<Bauobjekt[]> {
    const url = 'http://localhost:8080/bauobjekt';
    return this.http.get<Bauobjekt[]>(url).pipe(
      catchError(error => {
        console.error('Fehler beim Abrufen der Bauobjekte:', error);
        return throwError(() => new Error('Failed to fetch Bauobjekte'));
      })
    );
  }

  getBauobjektkomponentenByBauobjektId(bauobjektid: number): Observable<string[]> {
    const url = `http://localhost:8080/bauwerkkomponente/${bauobjektid}`;
    return this.http.get<string[]>(url).pipe(
      catchError(error => {
        console.error(`Fehler beim Abrufen der Bauobjektkomponenten für Bauobjekt mit ID ${bauobjektid}:`, error);
        return throwError(() => new Error(`Failed to fetch Bauobjektkomponenten for Bauobjekt with ID ${bauobjektid}`));
      })
    );
  }

  getMassnahmen() {
    this.online = true;
    this.massnahmen$ = this.http.get(this.apiUrl).pipe(
      catchError(error => this.handleGetAllError(error)));

    let localdata = this.indexDBService.getAllFromStore('IMDatabase', 'massnahmeStore');
    localdata.subscribe(bauobjekte => {
      let cnt = 0;

      bauobjekte.forEach(massnahme => {
        console.log('massnahme', massnahme);

        this.http.post<any>(this.apiUrl, massnahme).subscribe({
          next: data => {
            this.indexDBService.deleteFromStore('massnahmeStore', massnahme.id);
            console.log('Local massnahme added to DB', massnahme);
            cnt = cnt + 1;
          },
          error: error => {
            console.error('Local massnahme add to DB error!', error);
          }
        });

      });

      if (cnt > 0) {
        this.massnahmen$ = this.http.get(this.apiUrl).pipe(
          catchError(error => this.handleGetAllError(error)));
      }
    });

    this.massnahmen$ = this.massnahmen$.pipe(
      map(massnahmen => massnahmen.sort((a: Massnahme, b: Massnahme) => a.id - b.id)));
  }

  private handleGetAllError(error: HttpErrorResponse): Observable<any> {
    if (error.status !== 200) {
      this.online = false;
      return from(this.indexDBService.getAllFromStore('IMDatabase', 'massnahmeStore'));
    }
    return throwError(error);
  }

  getMassnahmeById(id: number): Observable<Massnahme> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Massnahme>(url).pipe(
      catchError(error => {
        // Fehlerbehandlung, falls in Fehler auftritt
        console.error(`Fehler beim Abrufen der Massnahme mit ID ${id}:`, error);
        return throwError(() => new Error(`Failed to fetch Massnahme with ID ${id}`));
      })
    );
  }


  addMassnahme(myMassnahme: Massnahme) {
    return this.http.post<any>(this.apiUrl, myMassnahme).pipe(
      catchError(error => {
        this.indexDBService.saveToIndexedDB(myMassnahme, 'massnahmeStore');
        return throwError(() => new Error('Failed to send Massnahme, data saved locally'));
      })
    ).subscribe({
      next: data => {
        this.getMassnahmen();
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }

  editMassnahme(myMassnahme: Massnahme) {
    return this.http.put<any>(this.apiUrl, myMassnahme).pipe(
      catchError(error => {
        this.indexDBService.replaceInStore(myMassnahme, 'massnahmeStore');
        return throwError(() => new Error('Failed to edit Massnahme, data saved locally'));
      })
    ).subscribe({
      next: data => {
        this.getMassnahmen();
      },
      error: error => {
        // Handle error here
        console.error('There was an error!', error);
      }
    });
  }

  delMassnahme(id: number) {
    return this.http.delete<any>('http://localhost:8081/massnahme/' + id).pipe(
      catchError(error => {
        this.indexDBService.deleteFromStore('massnahmeStore', id);
        return throwError(() => new Error('Failed to delete massnahme, data deleted locally'));
      })
    ).subscribe({
      next: data => {
        this.getMassnahmen();
      },
      error: error => {
        // Handle error here
        console.error('There was an error!', error);
      }
    });
  }

}
