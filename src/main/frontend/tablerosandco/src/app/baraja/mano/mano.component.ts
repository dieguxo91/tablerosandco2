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
export class ManoComponent implements AfterViewInit{



  mano : Cartas[] = [];


  constructor(private barajaService: BarajaService) {

  }


  getMano():Cartas[]{
    return this.mano;
  }

  agregarMano(carta: Cartas | undefined):void{
    if (carta) {
      this.mano.push(carta);
    }
  }

  ngAfterViewInit(): void {

  }








}
