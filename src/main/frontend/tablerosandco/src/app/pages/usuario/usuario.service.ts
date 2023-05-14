import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Users} from "./users";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiURL = "http://localhost:8080/Usuario/";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Users[]> {
    return this.httpClient.get<Users[]>(this.apiURL)
  }

  create(usuario: Users): Observable<Users> {
    return this.httpClient.post<Users>(this.apiURL, JSON.stringify(usuario), this.httpOptions)
  }

  find(id: number): Observable<Users> {
    return this.httpClient.get<Users>(this.apiURL + id)
  }

  update(id: number, usuario: Users): Observable<Users> {
    return this.httpClient.put<Users>(this.apiURL + id, JSON.stringify(usuario), this.httpOptions)
  }

  delete(id: number){
    return this.httpClient.delete<Users>(this.apiURL + id, this.httpOptions)
  }

}