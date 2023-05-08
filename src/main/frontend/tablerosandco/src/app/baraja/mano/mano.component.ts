import { Component, Injectable} from '@angular/core';
import {Cartas} from "../cartas_inteface";
import {BarajaService} from "../baraja.service";

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-mano',
  templateUrl: './mano.component.html',
  styleUrls: ['./mano.component.css']
})
export class ManoComponent{

  mano : Cartas[] = [];

  constructor(private barajaService: BarajaService) {

  }
//obtener la mano
  getMano():Cartas[]{
    return this.mano;
  }

  //modifica la mano
  setMano(cartas:Cartas[]):void{
    // @ts-ignore
    this.mano = cartas;
}
//agrega carta a la mano


}
