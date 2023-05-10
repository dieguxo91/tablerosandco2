import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import {Carta} from "./carta_inteface";
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BarajaService {


  cartas : Carta[] =[];

  private url = "http://localhost:8080/carta"; // url para conseguir las cartas de la BBDD/api

  constructor(private httpClient: HttpClient) {
  }

//accede a la api en busca de las cartas
  getAll (): Observable<Carta[]>{
    return this.httpClient.get<Carta[]>(this.url).pipe(
      catchError(this.errorHandler)
    );
  }


  //metodo para llenar la baraja nueva o de descarte
  maze_full(bar:Carta[]): Carta[]{
    return this.make_maze(bar);
  }

  // Metodo para crear la baraja
  make_maze(array: Carta[] ): Carta[]{
    let barajaProvi : Carta[]=[];
    array.forEach((value)=>{

      if (value.nombre== "oso"){
        for (let i = 0; i < 2 ; i++) {
          barajaProvi.push(value);
        }
      }else if(value.nombre == "raton" ){
        for (let i = 0; i < 4 ; i++) {
          barajaProvi.push(value);
        }
      }else if(value.nombre == "tigre" ){
        for (let i = 0; i < 6 ; i++) {
          barajaProvi.push(value);
        }
      }
      else if(value.nombre == "perro" ){
        for (let i = 0; i < 8 ; i++) {
          barajaProvi.push(value);
        }
      }else if(value.nombre == "zorro" ) {
        for (let i = 0; i < 10; i++) {
          barajaProvi.push(value);
        }
      }else if(value.nombre == "cerdo"){
        for (let i = 0; i < 10; i++) {
          barajaProvi.push(value);
        }
      }
    })
    return barajaProvi;
  }

  // Metodo para barajar las cartas
  barajar(cartas:Carta[]):Carta[]{
    return cartas.sort(() => Math.random() - 0.5);
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
