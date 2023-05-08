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
  boton !: HTMLButtonElement;


  constructor() {
  }
  dataIsHere(event: any) {
    this.baraja = event;
    this.iniciartablero();
    this.showChild = true;
    this.iniciarMano();
  }

  iniciartablero(){
    let carta:Cartas;
    for (let filas = 1 ; filas <= 4 ;filas++){
      this.fila = document.createElement("div")
      // @ts-ignore
      this.fila.style = "width: auto; margin: auto ; display:flex; justify-content: space-evenly ; "
      this.fila.id= "fila"+filas; // id filaX

      for (let col = 1; col <= 3; col++){
        this.imagen = document.createElement("img");
        this.casilla =  document.createElement("div");
        // @ts-ignore
        carta=this.baraja?.pop();
        this.casilla.id= carta.nombre; // id filaXcasillaX
        // @ts-ignore
        this.imagen.src= carta.url;
        // @ts-ignore
        this.imagen.style="width:80px;"

        this.casilla.appendChild(this.imagen);


        this.fila.appendChild(this.casilla);
      }
      //  Botones izquierdos
      this.boton= document.createElement("button");
      this.boton.id = "izq" + this.fila.id;   //izqfilaX
      this.boton.innerHTML="der";
      this.filas?.nativeElement.appendChild(this.boton);

      //hacer eventos de botones para meter las cartas, no se puede drag and drop
      //  Fila agregada al tablero
      this.filas?.nativeElement.appendChild(this.fila);

      //  botones derechos
      this.boton= document.createElement("button");
      this.boton.id = "der" + this.fila.id;  //derfilaX
      this.boton.innerHTML="izq";
      this.filas?.nativeElement.appendChild(this.boton);
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
