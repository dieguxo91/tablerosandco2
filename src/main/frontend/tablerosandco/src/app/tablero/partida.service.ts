import { Injectable } from '@angular/core';
import {Partida_interface} from "./partida_interface";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Usuario_interface} from "../pages/usuario/usuario_interface";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PartidaService {

  private api = "http://localhost:8080/partida/"

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Partida_interface[]> {
    return this.httpClient.get<Partida_interface[]>(this.api)
  }
  create(partida: Partida_interface): Observable<Partida_interface> {
    return this.httpClient.post<Partida_interface>(this.api, JSON.stringify(partida), this.httpOptions)
  }
  find(id: number): Observable<Partida_interface> {
    return this.httpClient.get<Partida_interface>(this.api + id,this.httpOptions).pipe(
      catchError(this.errorHandler)
    )
  }
  delete(id: number){
    return this.httpClient.delete<Partida_interface>(this.api + id, this.httpOptions)
  }

  errorHandler(error: any) {

    let errorMessage = '';

    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError(() => errorMessage);
  }
}
