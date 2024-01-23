import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import {Investition} from "../model/investition";


@Injectable({
  providedIn: 'root'
})
export class InvestitionService {
  private apiUrl = 'http://localhost:8081/api/investitionen';

  constructor(private http: HttpClient) { }

  createInvestition(investition: Investition): Observable<Investition> {
    return this.http.post<Investition>(this.apiUrl, investition);
  }
  getInvestitionen(): Observable<Investition[]> {
    return this.http.get<Investition[]>(this.apiUrl);
  }

  updateInvestition(investitionsID: number | undefined, investition: Investition): Observable<Investition> {
    return this.http.put<Investition>(`${this.apiUrl}/${investitionsID}`, investition);
  }

  deleteInvestition(investitionsID: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${investitionsID}`);
  }
}
