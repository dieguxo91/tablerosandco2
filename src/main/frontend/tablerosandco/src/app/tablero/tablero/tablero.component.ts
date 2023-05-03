import {Component, Injectable} from '@angular/core';
import {Cartas} from "../../baraja/cartas_inteface";
import {BarajaComponent} from "../../baraja/baraja/baraja.component";
import {ManoComponent} from "../../baraja/mano/mano.component";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
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
    this.obtenerbaraja()
    this.mano = this.manoComponent.getMano(); // esto se iniciaria en el juego?
  }
  descarte: Cartas[];
  constructor( private manoComponent: ManoComponent, private barajaComponent: BarajaComponent ) {
    this.mano=[]; // los iniciamos todos vacios
    this.descarte=[];
    this.baraja=[];
  }
  obtenerbaraja(){
    this.baraja= this.barajaComponent.getCartas();
  }


  getBaraja():Cartas[]{
    return this.baraja;
  }

  getMano():Cartas[]{
    return this.mano;
  }
  drop(event: CdkDragDrop<string[]>){
    moveItemInArray(this.mano, event.previousIndex, event.currentIndex)
  }

  primerascartas():Cartas[]{
    let cincoCartas: Cartas[]=[];
    if(this.baraja.length > 0) {
      for (let cart = 0; cart < 5; cart++) {
        // @ts-ignore
        cincoCartas.push(this.baraja.pop());
      }
    }
    return cincoCartas;
  }


}
