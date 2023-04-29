import {Component, Injectable} from '@angular/core';
import {Cartas} from "../../baraja/cartas_inteface";
import {BarajaComponent} from "../../baraja/baraja/baraja.component";
import {ManoComponent} from "../../baraja/mano/mano.component";
@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})
export class TableroComponent {

  baraja: Cartas[];

  mano: Cartas[];

  ngOnInit():void{
    this.obtenermano()
  }
  descarte: Cartas[];
  constructor( private manoComponent: ManoComponent) {
    this.mano=[];
    this.descarte=[];
    this.baraja=[];
  }

  obtenermano(){
   this.mano= this.manoComponent.getMano();
  }



  getBaraja():Cartas[]{
    return this.baraja;
  }



}
