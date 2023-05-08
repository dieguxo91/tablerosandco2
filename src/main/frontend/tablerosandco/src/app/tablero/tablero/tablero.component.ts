import {Component, ElementRef, Injectable, ViewChild} from '@angular/core';
import {Cartas} from "../../baraja/cartas_inteface";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})

export class TableroComponent {

  @ViewChild("filas") filas: ElementRef |undefined;


  mano: Cartas[] =[];
  showChild: boolean = false;
  baraja!: Cartas[];

  // Elementos del DOM

  fila!:HTMLDivElement  ;
  casilla!:HTMLDivElement ;
  imagen !:HTMLImageElement


  constructor() {
  }
  dataIsHere(event: any) {
    this.baraja = event;
    this.iniciartablero();
    this.showChild = true;
    this.iniciarMano();
  }

  iniciartablero(){
    for (let filas = 1 ; filas <= 4 ;filas++){
      this.fila = document.createElement("div")
      // @ts-ignore
      this.fila.style = "width: auto; margin: auto ; display:flex; justify-content: space-evenly ; "
      this.fila.id= "fila"+filas; // id filaX
      for (let col = 1; col <= 3; col++){
        this.imagen = document.createElement("img");
        this.casilla =  document.createElement("div");
        this.casilla.id= this.fila.id + "casilla" + col; // id filaXcasillaX
        // @ts-ignore
        this.imagen.src=this.baraja?.pop().url;
        // @ts-ignore
        this.imagen.style="width:80px;"

        this.casilla.appendChild(this.imagen);
        this.fila.appendChild(this.casilla);
      }
      this.filas?.nativeElement.appendChild(this.fila);
    }
  }


  drop(event: CdkDragDrop<Cartas[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
  robar():void{
    if (this.baraja.length>0){
      this.agregarMano(this.baraja.pop());
    }else{
      console.log("la baraja esta vacia")
    }
  }
  agregarMano(carta: Cartas | undefined){
    if (carta) {
      this.mano.push(carta);
    }
  }

  iniciarMano(){
    for(let cont =1; cont <=5; cont++){
      this.mano.push(<Cartas>this.baraja.pop());
    }
  }

}
