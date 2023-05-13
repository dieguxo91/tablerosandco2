import {Component, ElementRef, Injectable, ViewChild} from '@angular/core';
import {Carta} from "../../baraja/carta_inteface";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
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


  mano: Carta[]=[];
  showChild: boolean = false;
  baraja!: Carta[];

  // Elementos del DOM

  fila!:HTMLDivElement  ;
  casilla!:HTMLDivElement ;
  imagen !:HTMLImageElement;
  boton !: HTMLButtonElement;

  imagenBotonDer !: HTMLImageElement;
  imagenBotonIzq !: HTMLImageElement;


  constructor() {
  }
// Inicia el tablero, la baraja y la mano
  dataIsHere(event: any) {
    this.baraja = event;
    this.iniciartablero();
    this.showChild = true;
    this.iniciarMano();

  }



  iniciartablero(){
    let carta:Carta;

    for (let filas = 1 ; filas <= 4 ;filas++){// para
      this.fila = document.createElement("div") // creamos las filas individualmente
      // @ts-ignore

      this.fila.style = "width: auto; margin: auto ; display:flex; justify-content: space-evenly ;" // damos estilos a la fila

      this.fila.id= "fila"+filas; // id filaX
      //  Botones izquierdos
      this.boton= document.createElement("button"); // creamos el boton
      this.boton.id = "izq" + this.fila.id;   //izqfilaX
      // @ts-ignore
      this.boton.style = "border: 0 ; background-color: #9fe1fd;"
      this.imagenBotonIzq= document.createElement('img');
      this.imagenBotonIzq.src= "./assets/images/flecha-izq.png";
      // @ts-ignore
      this.imagenBotonIzq.style = "width:60px";

      this.boton.appendChild(this.imagenBotonIzq);

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
      // @ts-ignore
      this.boton.style = "border: 0 ; background-color: #9fe1fd;"
      this.imagenBotonDer= document.createElement('img');
      this.imagenBotonDer.src= "./assets/images/flecha-der.png";
      // @ts-ignore
      this.imagenBotonDer.style = "  width:60px;";

      this.boton.appendChild(this.imagenBotonDer);
      this.botonDer(this.boton, this.fila.id)// Funcion insertar por detras, tiene que ser lambda
      this.fila.appendChild(this.boton);

    }
  }

  drop(event: CdkDragDrop<{title: string; poster: string}[]>) {
    moveItemInArray(this.mano, event.previousIndex, event.currentIndex);
  }
  robar():void{
    if (this.baraja.length>0){
      this.agregarMano(this.baraja.pop());
    }else{
      console.log("la baraja esta vacia")
    }
    for (let i = 0; i < this.mano.length; i++){
      // @ts-ignore
      this.mano.at(i).seleccionado= false;
    }
  }
  agregarMano(carta: Carta | undefined){
    if (carta) {
      this.mano.push(carta);
    }
  }

  iniciarMano(){
    for(let cont =1; cont <=5; cont++){
      this.mano.push(<Carta>this.baraja.pop());
    }
  }

  //funcion para el boton izq

  botonizq(boton: HTMLButtonElement, fila: string){

    boton.addEventListener("click",()=>{
      let filaProv:any;
      let botonProvi:any;
      let restoFila:any;
      let cartas:Carta[];
      filaProv = document.querySelector("#"+fila);

      if(this.mano.length>0) {
        cartas = this.robarmano();
        restoFila = document.createElement("div");
        botonProvi = filaProv.removeChild(filaProv.firstChild)
        while (filaProv.firstChild) {
          restoFila.appendChild(filaProv.removeChild(filaProv.firstChild))
        }

        filaProv = document.querySelector("#"+fila);
        filaProv.appendChild(botonProvi);
        if (cartas) {
          for (let cont = 0; cont < cartas.length; cont++) {
            this.imagen = document.createElement("img");
            this.casilla = document.createElement("div");

            // @ts-ignore
            this.casilla.id = cartas.at(cont).nombre; // id filaXcasillaX
            //imagen y estilos, arreglar con bootstrap
            // @ts-ignore
            this.imagen.src = cartas.at(cont).url;
            // @ts-ignore
            this.imagen.style = "width:80px;"

            this.casilla.appendChild(this.imagen);// insertar imagen en la ficha
            filaProv.appendChild(this.casilla);// insertar la casilla en la fila
          }
        }
        while (restoFila.firstChild) {
          filaProv.appendChild(restoFila.removeChild(restoFila.firstChild))
        }
      }

    });// Funcion insertar por delante
  }

  botonDer(boton: HTMLButtonElement, fila:string){

    boton.addEventListener("click",()=>{
      let filaProv:any;
      let botonProvi:any;
      let cartas :Carta[];
      this.imagen = document.createElement("img");
      this.casilla =  document.createElement("div");
      filaProv = document.querySelector("#"+fila);

      //prueba, arreglar

      if(this.mano.length>0){
        cartas=this.robarmano();
        if(cartas){
          botonProvi = filaProv.lastChild;
          filaProv.removeChild(filaProv.lastChild);
          for (let cont = 0; cont < cartas.length; cont++){
            this.imagen = document.createElement("img");
            this.casilla =  document.createElement("div");
            // @ts-ignore
            this.casilla.id= cartas.at(cont).nombre; // id filaXcasillaX
            //imagen y estilos, arreglar con bootstrap
            // @ts-ignore
            this.imagen.src= cartas.at(cont).url;
            // @ts-ignore
            this.imagen.style="width:80px;"
            this.casilla.appendChild(this.imagen);// insertar imagen en la ficha
            filaProv.appendChild(this.casilla);// insertar la casilla en la fila
          }
          filaProv.appendChild(botonProvi); // insertamos el boton al final de la fila
        }
      }
    });// Funcion insertar por detras
  }
  // prueba echar carta, nombre regu, dar una vuelta
  cartaSeleccionada(carta: Carta){
    for (let i = 0; i < this.mano.length; i++){
      // @ts-ignore
      this.mano.at(i).seleccionado= false;
    }
    carta.seleccionado=true;
    this.aumentar(carta);
  }

  aumentar(carta:Carta):void{
    let manoProvi !: NodeListOf<HTMLDivElement>;
    for (let i = 0; i < this.mano.length; i++){
      // @ts-ignore
      if(this.mano.at(i).nombre == carta.nombre){
        manoProvi = document.querySelectorAll("#mano"+ carta.nombre);
        for (let j = 0; j < manoProvi.length; j++){
          // @ts-ignore
          manoProvi.item(j).style= "width:80px";
        }
        break;
      }
    }
  }

  robarmano():Carta[]{
    let cartaMano!: Carta;
    let arrayCartas : Carta []=[];
    let indicesEliminados: number[] = []

    if(this.mano.length> 0) {
      for (let cont = 0; cont < this.mano.length; cont++){
        // @ts-ignore
        if(this.mano.at(cont).seleccionado){
          // @ts-ignore
          cartaMano= this.mano.at(cont);
          for (let i = 0; i < this.mano.length; i++){
            // @ts-ignore
            if(cartaMano.nombre == this.mano.at(i).nombre){
              // @ts-ignore
              this.mano.at(i).seleccionado=true;
              // @ts-ignore
              arrayCartas.push(this.mano.at(i));
              indicesEliminados.push(i);
            }
          }
          for (let i = 0; i < indicesEliminados.length; i++) {
            this.mano.splice(indicesEliminados[indicesEliminados.length-1-i],1);
          }
          return arrayCartas;
        }
      }
    }
    return arrayCartas;

  }


}
