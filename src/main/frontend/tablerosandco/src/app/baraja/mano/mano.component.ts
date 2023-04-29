import {AfterContentInit, AfterViewInit, Component, Injectable, ViewChild} from '@angular/core';
import {Cartas} from "../cartas_inteface";
import {BarajaService} from "../baraja.service";
import {BarajaComponent} from "../baraja/baraja.component";
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

  getMano():Cartas[]{
    return this.mano;
  }

  setMano(cartas:Cartas[]):void{
    this.mano=cartas;
}

  agregarMano(carta: Cartas | undefined):Cartas[]{
    if (carta) {
      this.mano.push(carta);
    }
    return this.mano;
  }












}
