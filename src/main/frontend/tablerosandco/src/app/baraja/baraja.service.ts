import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import {Cartas} from "./cartas_inteface";
import { catchError } from 'rxjs/operators';
import {BarajaComponent} from "./baraja/baraja.component";

@Injectable({
  providedIn: 'root'
})
export class BarajaService {


  cartas : Cartas[] =[];

  private url = "http://localhost:8080/carta"; // url para conseguir las cartas de la BBDD/api

  constructor(private httpClient: HttpClient) {
  }

//accede a la api en busca de las cartas
  getAll (): Observable<Cartas[]>{
    return this.httpClient.get<Cartas[]>(this.url).pipe(
      catchError(this.errorHandler)
    );
  }


  //metodo para llenar la baraja nueva o de descarte
  maze_full(bar:Cartas[]): Cartas[]{
    return this.make_maze(bar);
  }

  // Metodo para crear la baraja
  make_maze(array: Cartas[] ): Cartas[]{
    let barajaProvi : Cartas[]=[];
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
      }
    })
    return barajaProvi;
  }

  // Metodo para barajar las cartas
  barajar(cartas:Cartas[]):Cartas[]{
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
