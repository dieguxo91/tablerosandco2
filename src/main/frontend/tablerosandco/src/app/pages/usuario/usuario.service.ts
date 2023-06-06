import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Usuario_interface} from "./usuario_interface";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiURL = "http://localhost:8080/usuario/";
  private apiCrear = "http://localhost:8080/auth/register";

  private apiAdmin ="http://localhost:8080/usuario/listado";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Usuario_interface[]> {
    return this.httpClient.get<Usuario_interface[]>(this.apiURL)
  }
  getAdmin(): Observable<Usuario_interface[]> {
    return this.httpClient.get<Usuario_interface[]>(this.apiAdmin)
  }

  create(usuario: Usuario_interface): Observable<Usuario_interface> {
    return this.httpClient.post<Usuario_interface>(this.apiCrear, JSON.stringify(usuario), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  find(id: number): Observable<Usuario_interface> {
    return this.httpClient.get<Usuario_interface>(this.apiURL + id)
  }

  update(id: number, usuario: Usuario_interface): Observable<Usuario_interface> {
    const x = {...usuario, 'id_user': id};
    return this.httpClient.put<Usuario_interface>(this.apiURL + id, x, this.httpOptions)
  }

  delete(id: number){
    return this.httpClient.delete<Usuario_interface>(this.apiURL + id, this.httpOptions)
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
