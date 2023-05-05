import {AfterViewInit, Component, Injectable, OnInit, ViewChild} from '@angular/core';
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
export class TableroComponent implements AfterViewInit{

  mano: Cartas[]=[];
  @ViewChild("selectorBar") baraja: Cartas[]=[];
  tablero: Cartas[] =[]

  ngAfterViewInit():void{
    this.mano = this.manoComponent.getMano(); // esto se iniciaria en el juego?
    this.iniciartablero();
  }

  iniciartablero(){
    for (let cont = 0; cont < 16; cont++){
      // @ts-ignore
      this.tablero.push(this.baraja?.pop()) ;
  console.log("paco")

    }

  }
  constructor( private manoComponent: ManoComponent, private barajaComponent: BarajaComponent ) {

  }

  drop(event: CdkDragDrop<string[]>){
    moveItemInArray(this.mano, event.previousIndex, event.currentIndex)
  }
}
