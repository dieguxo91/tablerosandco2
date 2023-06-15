import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {StorageService} from "./Storage.service";
import {Observable, throwError} from "rxjs";
import {HttpRequestInterceptor} from "./HttpRequestInterceptor";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiAuthURL = "http://localhost:8080/auth/";

  private roles: string []=[];
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient, private storageService: StorageService) { }

  login(username: string, password: string): Observable<any> {
    return this.httpClient.post(
      this.apiAuthURL + 'login',
      {
        username,
        password,
      }, this.httpOptions
    );
  }


  logout() {
    this.storageService.clean();
  }

  hasRole(rol:string):boolean{
    this.roles= this.storageService.getUser().roles;
    if(this.roles.includes(rol)){
      return true;
    }
    return false;
  }

  logueado():boolean{
    return this.storageService.isLoggedIn()
  }

  errorHandler(error:any) {

    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => errorMessage);
  }
}
