import {Component, Injectable} from '@angular/core';
import {Cartas} from "../cartas_inteface";
import {BarajaService} from "../baraja.service";
import {BarajaComponent} from "../baraja/baraja.component";


@Component({
  selector: 'app-descarte',
  templateUrl: './descarte.component.html',
  styleUrls: ['./descarte.component.css']
})
export class DescarteComponent {

  mazo_descarte: Cartas[];

  titulo : string = "descarte";
  constructor(private barajaService: BarajaService, private barajaComponent : BarajaComponent ) {
    this.mazo_descarte = [];
  }


  vaciar_mazo(mazo_desc: Cartas[]):void{
    this.barajaService.make_maze(mazo_desc);
  }

  pasar_mazo(cartas: Cartas[]):void{
    this.barajaComponent.setBaraja(this.mazo_descarte);
  }

  /*setDescarte(carta:Cartas):void{
    this.mazo_descarte.push(carta)
  }*/

}
