import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import {Investition} from "../investition";


@Injectable({
  providedIn: 'root'
})
export class InvestitionService {
  private apiUrl = 'http://localhost:8080/api/investitionen';

  constructor(private http: HttpClient) { }

  createInvestition(investition: Investition): Observable<Investition> {
    return this.http.post<Investition>(this.apiUrl, investition);
  }
}

