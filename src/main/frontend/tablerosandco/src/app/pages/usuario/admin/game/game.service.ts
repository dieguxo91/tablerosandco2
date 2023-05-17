import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Juego_interface} from "../../../principal/juego_interface";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class GameService {



  private apiURL = "http://localhost:8080/Juego/";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Juego_interface[]> {
    return this.httpClient.get<Juego_interface[]>(this.apiURL)
  }

  create(juego: Juego_interface): Observable<Juego_interface> {
    return this.httpClient.post<Juego_interface>(this.apiURL, JSON.stringify(juego), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  find(id: number): Observable<Juego_interface> {
    return this.httpClient.get<Juego_interface>(this.apiURL + id)
  }

  update(id: number, juego: Juego_interface): Observable<Juego_interface> {
    return this.httpClient.put<Juego_interface>(this.apiURL + id, JSON.stringify(juego), this.httpOptions)
  }

  delete(id: number){
    return this.httpClient.delete<Juego_interface>(this.apiURL + id, this.httpOptions)
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
