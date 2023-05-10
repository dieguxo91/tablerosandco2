import {Component, ElementRef, Injectable, ViewChild} from '@angular/core';
import {Cartas} from "../../baraja/cartas_inteface";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
// @ts-ignore
import * as events from "events";

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
  botonTemp !: HTMLButtonElement ;

  seleccionada!: Boolean;

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
      this.fila = document.createElement("div") // creamos las filas individualmente
      // @ts-ignore
      this.fila.style = "width: auto; margin: auto ; display:flex; justify-content: space-evenly ;" // damos estilos a la fila
      this.fila.id= "fila"+filas; // id filaX
      //  Botones izquierdos
      this.boton= document.createElement("button"); // creamos el boton
      this.boton.id = "izq" + this.fila.id;   //izqfilaX
      this.boton.innerHTML="izq"; // nombre de prueba

      this.fila.appendChild(this.boton);


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

      //  Fila agregada al tablero
      this.filas?.nativeElement.appendChild(this.fila);


      this.botonizq(this.boton, this.fila.id);


      //  botones derechos
      this.boton= document.createElement("button");
      this.boton.id = "der" + this.fila.id;  //derfilaX
      this.boton.innerHTML="der";
      this.botonDer(this.boton, this.fila.id)// Funcion insertar por detras, tiene que ser lambda
      this.fila.appendChild(this.boton);

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

  //funcion para el boton izq

  botonizq(boton: HTMLButtonElement, fila: string){

    boton.addEventListener("click",()=>{
      let filaProv:any;
      let botonProvi:any;
      let restoFila:any;
      let carta:Cartas;
      filaProv = document.querySelector("#"+fila);
      botonProvi= filaProv.firstChild;
      filaProv.removeChild(filaProv.firstChild);
      this.imagen = document.createElement("img");
      this.casilla =  document.createElement("div");
      restoFila = document.createElement("div");
      //prueba, arreglar
      carta=this.robarmano();
      this.casilla.id= carta.nombre; // id filaXcasillaX
      // @ts-ignore
      this.imagen.src= carta.url;
      // @ts-ignore
      this.imagen.style="width:80px;"

      this.casilla.appendChild(this.imagen);
      restoFila.style = filaProv.style;

      while(filaProv.firstChild){
        restoFila.appendChild(filaProv.removeChild(filaProv.firstChild))
      }
      filaProv.appendChild(botonProvi);
      filaProv.appendChild(this.casilla);
      while(restoFila.firstChild){
        filaProv.appendChild(restoFila.removeChild(restoFila.firstChild))
      }
    });// Funcion insertar por delante
  }

  botonDer(boton: HTMLButtonElement, fila:string){
    if(!this.seleccionada)
    boton.addEventListener("click",()=>{
      let filaProv:any;
      let botonProvi:any;
      let restoFila:any;
      let carta:Cartas;
      this.imagen = document.createElement("img");
      this.casilla =  document.createElement("div");
      restoFila = document.createElement("div");
      filaProv = document.querySelector("#"+fila);
      botonProvi= filaProv.lastChild;
      filaProv.removeChild(filaProv.lastChild);

      //prueba, arreglar
      carta=this.robarmano();
      this.casilla.id= carta.nombre; // id filaXcasillaX
      // @ts-ignore
      this.imagen.src= carta.url;
      // @ts-ignore
      this.imagen.style="width:80px;"

      this.casilla.appendChild(this.imagen);

      filaProv.appendChild(this.casilla);
      filaProv.appendChild(botonProvi);

    });// Funcion insertar por detras
  }
  // prueba con la mano para el tablero
  robarmano():Cartas{
    let cartaMano!: Cartas;
    if(this.mano.length> 0) {
      for (let cont = 0; cont < this.mano.length; cont++){
        // @ts-ignore
        if(this.mano.at(cont).seleccionado){
          // @ts-ignore
          cartaMano= this.mano.at(cont);
          this.mano.splice(cont, 1);
          return cartaMano;
        }
      }
    }
    return cartaMano;

  }

  cartaSeleccionada(carta: Cartas){
    carta.seleccionado=true;
    //this.aumentar(carta.nombre) Dar una vuelta
  }
  aumentar(nombre:string){
    let divCarta!: any;
    console.log("paco")
    divCarta = document.querySelector(nombre);
    divCarta.style="width:100px"
  }

}
