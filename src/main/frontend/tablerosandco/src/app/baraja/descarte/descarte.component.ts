import {Component, Injectable} from '@angular/core';
import {Carta} from "../carta_inteface";
import {BarajaService} from "../baraja.service";
import {BarajaComponent} from "../baraja/baraja.component";


@Component({
  selector: 'app-descarte',
  templateUrl: './descarte.component.html',
  styleUrls: ['./descarte.component.css']
})
export class DescarteComponent {

  mazo_descarte: Carta[];

  titulo : string = "descarte";

  constructor(private barajaService: BarajaService, private barajaComponent : BarajaComponent ) {
    this.mazo_descarte = [];
  }


  vaciar_mazo(mazo_desc: Carta[]):void{
    this.barajaService.make_maze(mazo_desc);
  }

  pasar_mazo():void{
    this.barajaService.barajar(this.mazo_descarte);
    this.barajaComponent.setBaraja(this.mazo_descarte);
  }

  /*setDescarte(carta:Cartas):void{
    this.mazo_descarte.push(carta)
  }*/

}
