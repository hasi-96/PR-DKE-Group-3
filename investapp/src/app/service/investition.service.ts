import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import {catchError, from, Observable, throwError} from 'rxjs';
import {Investition} from "../model/investition";
import {map} from "rxjs/operators";
import {Massnahme} from "../model/massnahme";
import {IndexDBService} from "./indexDB.service";

/**
 * InvestitionService bietet eine Schnittstelle für das Abrufen, Hinzufügen, Bearbeiten und Löschen
 * von Investitionsdaten über eine REST-API. Bei Netzwerkfehlern werden die Daten stattdessen
 * in IndexedDB gespeichert und bei Wiederherstellung der Internetverbindung synchronisiert.
 */

@Injectable({
  providedIn: 'root'
})
export class InvestitionService {
  public online: boolean;
  private apiUrl = 'http://localhost:8081/investitionen';
  public investition$: Observable<any>;

  constructor(private http: HttpClient, private indexDBService: IndexDBService) {
    this.investition$ = {} as Observable<any>;
    this.online = false;
  }

  getMassnahmeID(): Observable<Massnahme[]> {
    const url = 'http://localhost:8081/massnahme';
    return this.http.get<Massnahme[]>(url).pipe(
      catchError(error => {
        console.error('Fehler beim Abrufen der Massnahme:', error);
        return throwError(() => new Error('Failed to fetch Massnahme'));
      })
    );
  }

  getInvestition() {
    this.online = true;
    this.investition$ = this.http.get(this.apiUrl).pipe(
      catchError(error => this.handleGetAllError(error)));

    let localdata = this.indexDBService.getAllFromStore('IMDatabase', 'investitionStore');
    localdata.subscribe(investitionen => {
      let cnt = 0;

      investitionen.forEach(investitionen => {
        console.log('investitionen', investitionen);

        this.http.post<any>(this.apiUrl, investitionen).subscribe({
          next: data => {
            this.indexDBService.deleteFromStore('investitionStore', investitionen.id);
            console.log('Local Investition added to DB', investitionen);
            cnt = cnt + 1;
          },
          error: error => {
            console.error('Local Investition  add to DB error!', error);
          }
        });

      });

      if (cnt > 0) {
        this.investition$ = this.http.get(this.apiUrl).pipe(
          catchError(error => this.handleGetAllError(error)));
      }
    });

    this.investition$ = this.investition$.pipe(
      map(investion => investion.sort((a: Investition, b: Investition) => a.id - b.id)));
  }

  private handleGetAllError(error: HttpErrorResponse): Observable<any> {
    if (error.status !== 200) {
      this.online = false;
      return from(this.indexDBService.getAllFromStore('IMDatabase', 'investitionStore'));
    }
    return throwError(error);
  }

  getInvestitionById(id: number): Observable<Investition> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Investition>(url).pipe(
      catchError(error => {
        // Fehlerbehandlung, falls in Fehler auftritt
        console.error(`Fehler beim Abrufen der Investition mit ID ${id}:`, error);
        return throwError(() => new Error(`Failed to fetch Investition with ID ${id}`));
      })
    );
  }

  addInvestition(invest: Investition) {
    return this.http.post<any>(this.apiUrl, invest).pipe(
      catchError(error => {
        this.indexDBService.saveToIndexedDB(invest, 'investitionStore');
        return throwError(() => new Error('Failed to send Investion, data saved locally'));
      })
    ).subscribe({
      next: data => {
        this.getInvestition();
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }

  editInvestition(invest: Investition) {
    return this.http.put<any>(this.apiUrl, invest).pipe(
      catchError(error => {
        this.indexDBService.replaceInStore(invest, 'investitionStore');
        return throwError(() => new Error('Failed to edit Investition, data saved locally'));
      })
    ).subscribe({
      next: data => {
        this.getInvestition();
      },
      error: error => {
        // Handle error here
        console.error('There was an error!', error);
      }
    });
  }

  deleteInvestition(id: number) {
    return this.http.delete<any>('http://localhost:8081/investitionen/' + id).pipe(
      catchError(error => {
        this.indexDBService.deleteFromStore('investitionStore', id);
        return throwError(() => new Error('Failed to delete massnahme, data deleted locally'));
      })
    ).subscribe({
      next: data => {
        this.getInvestition();
      },
      error: error => {
        // Handle error here
        console.error('There was an error!', error);
      }
    });
  }


}
