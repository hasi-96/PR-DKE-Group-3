import { Injectable } from '@angular/core';
import { from, Observable, of, throwError, catchError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

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

  constructor(private http: HttpClient)
  {
    this.bauobjekte$ = {} as Observable<any>;
    this.bauwerkKomponente$ = {} as Observable<any>;
  }

  getBauobjekte()
  {
    this.bauobjekte$ =  this.http.get('http://localhost:8080/bauobjekt');
  }

  getBauobjekt(id: number) {
    return this.http.get<Bauobjekt>('http://localhost:8080/bauobjekt/' + id);
  }

  getBauwerkKomponente(id: number)
  {
    this.bauwerkKomponente$ = this.http.get('http://localhost:8080/bauwerkkomponente/' + id);
  }
}
