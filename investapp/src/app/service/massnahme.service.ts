import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Massnahme} from "../model/massnahme";



@Injectable({
  providedIn: 'root'
})
export class MassnahmeService {
  private apiUrl = 'http://localhost:8080/api/massnahmen';


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  // CREATE: Neue Massnahme hinzufügen
  addMassnahme(massnahme: Massnahme): Observable<Massnahme> {
    return this.http.post<Massnahme>(this.apiUrl, massnahme, this.httpOptions);
  }

  // READ: Alle Massnahmen abrufen
  getMassnahmen(): Observable<Massnahme[]> {
    return this.http.get<Massnahme[]>(this.apiUrl);
  }

  // READ: Eine spezifische Massnahme nach ID abrufen
  getMassnahmeById(id: number): Observable<Massnahme> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Massnahme>(url);
  }

  // UPDATE: Eine spezifische Massnahme aktualisieren
  updateMassnahme(massnahme: Massnahme): Observable<any> {
    const url = `${this.apiUrl}/${massnahme.massnahmenID}`;
    return this.http.put(url, massnahme, this.httpOptions);
  }

  // DELETE: Eine spezifische Massnahme löschen
  deleteMassnahme(id: number): Observable<Massnahme> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Massnahme>(url, this.httpOptions);
  }
}
