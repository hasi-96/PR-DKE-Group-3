import { Injectable } from '@angular/core';
import { from, Observable, of, throwError, catchError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

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

export class BauobjektService {

	public bauobjekte$: Observable<any>;
	public bauwerkKomponente$: Observable<any>;

	bauobjekteLocal: Bauobjekt[] = [];
	
    constructor(private http: HttpClient)
	{
		 this.bauobjekte$ = {} as Observable<any>;
		 this.bauwerkKomponente$ = {} as Observable<any>;
		 
		 this.getBauobjekte();
	}

	getBauobjekte()
	{
		this.bauobjekte$ =  this.http.get('http://localhost:8080/bauobjekt').pipe(
			catchError(error => this.handleError(error)));
			
		this.bauobjekte$ = this.bauobjekte$.pipe(
			map(bauobjekte => bauobjekte.sort((a:Bauobjekt, b:Bauobjekt) => a.id - b.id)));
	}
	
	private handleError(error: HttpErrorResponse): Observable<any> {
    // If error, fallback to fetching data from IndexedDB
    if (error.status !== 200) {
      return from(this.fetchFromIndexedDB());
    }
    // Re-throw the error if it's not a network error
    return throwError(error);
	}
  
	private fetchFromIndexedDB(): Observable<any> {

		return of(this.bauobjekteLocal);
	}
	
	getBauobjekt(id: number) {
		return this.http.get<Bauobjekt>('http://localhost:8080/bauobjekt/' + id);
	}
	
	addBauobjekt(myBauobjekt: Bauobjekt)
	{		
		return this.http.post<any>('http://localhost:8080/bauobjekt', myBauobjekt).pipe(
		  catchError(error => {
			this.saveToIndexedDB(myBauobjekt);
			return throwError(() => new Error('Failed to send Bauobjekt, data saved locally'));
		  })
		).subscribe({
		  next: data => {
			this.getBauobjekte();
		  },
		  error: error => {
			// Handle error here
			console.error('There was an error!', error);
		  }
		});
	}
	
	editBauobjekt(myBauobjekt: Bauobjekt)
	{		
		return this.http.put<any>('http://localhost:8080/bauobjekt', myBauobjekt).pipe(
		  catchError(error => {
			this.saveToIndexedDB(myBauobjekt);
			return throwError(() => new Error('Failed to send Bauobjekt, data saved locally'));
		  })
		).subscribe({
		  next: data => {
			this.getBauobjekte();
		  },
		  error: error => {
			// Handle error here
			console.error('There was an error!', error);
		  }
		});
	}
	
	delBauobjekt(id: number)
	{		
		return this.http.delete<any>('http://localhost:8080/bauobjekt/' + id).pipe(
		  catchError(error => {
			return throwError(() => new Error('Failed to delete Bauobjekt, system is offline'));
		  })
		).subscribe({
		  next: data => {
			this.getBauobjekte();
		  },
		  error: error => {
			// Handle error here
			console.error('There was an error!', error);
		  }
		});
	}
	
	getBauwerkKomponente(id: number)
	{
		this.bauwerkKomponente$ = this.http.get('http://localhost:8080/bauwerkkomponente/' + id).pipe(
			catchError(error => this.handleError(error)));
	}
	
	addBauwerkKomponente(id: number, bauwerkKomponente: string)
	{		
		return this.http.post<any>('http://localhost:8080/bauwerkkomponente/' + id, bauwerkKomponente).pipe(
		  catchError(error => {
			return throwError(() => new Error('Failed to add BauwerkKomponente, data saved locally'));
		  })
		).subscribe({
		  next: data => {
			this.getBauwerkKomponente(id);
		  },
		  error: error => {
			// Handle error here
			console.error('There was an error!', error);
		  }
		});
	}
	
	delBauwerkKomponente(id: number, bauwerkKomponente: string)
	{		
		return this.http.delete<any>('http://localhost:8080/bauwerkkomponente/' + id + '/' + bauwerkKomponente).pipe(
		  catchError(error => {
			return throwError(() => new Error('Failed to delete BauwerkKomponente, system is offline'));
		  })
		).subscribe({
		  next: data => {
			this.getBauwerkKomponente(id);
		  },
		  error: error => {
			// Handle error here
			console.error('There was an error!', error);
		  }
		});
	}
	
	private saveToIndexedDB(myBauobjekt: Bauobjekt) {
		this.bauobjekteLocal.push(myBauobjekt);  
	}
}
