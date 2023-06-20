import {Component, ElementRef, Injectable, OnInit, ViewChild} from '@angular/core';
import {Carta} from "../../baraja/carta_inteface";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
// @ts-ignore
import * as events from "events";
import {BarajaService} from "../../baraja/baraja.service";
import {StorageService} from "../../security/Storage.service";
import {Usuario_interface} from "../../pages/usuario/usuario_interface";
import {JuegoService} from "../../pages/principal/juego.service";
import {UsuarioService} from "../../pages/usuario/usuario.service";
import {Juego_interface} from "../../pages/principal/juego_interface";
import {Observable} from "rxjs";
import {PartidaService} from "../partida.service";
import {Partida_interface} from "../partida_interface";

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})

export class TableroComponent implements OnInit{

  @ViewChild("filas") filas: ElementRef |undefined;


  mano: Carta[]=[];
  showChild: boolean = false;
  baraja!: Carta[];
  descarte !: Carta[];
  descartadas !: Carta[];
  contadorDesc !: number;
  cartaRepe!: Carta;


  // Elementos del DOM

  fila!:HTMLDivElement  ;
  casilla!:HTMLDivElement ;
  imagen !:HTMLImageElement;
  boton !: HTMLButtonElement;

  imagenBotonDer !: HTMLImageElement;
  imagenBotonIzq !: HTMLImageElement;

  private id_jugador !: Usuario_interface;
  private  id_juego !: Juego_interface;

  private partidaNueva!: Partida_interface;
  constructor(private barajaService: BarajaService, private juegoService: JuegoService, private usuarioService: UsuarioService, private storageService : StorageService, private partidaService: PartidaService) {

  }

  ngOnInit(): void {

     /*this.juegoService.find(7).subscribe((data: Juego_interface)=>{
      this.id_juego = data;
       this.usuarioService.find(this.storageService.getUser().id).subscribe((data: Usuario_interface)=>{
         this.id_jugador = data;
         this.partidaNueva = {
           id_juego_partida : this.id_juego,
           id_jugador_partida : this.id_jugador
         }
         this.partidaService.create(this.partidaNueva).subscribe(res => {
           console.log('Partida creada');
         })
       });
    });*/
  this.descarte=[];
  this.descartadas=[]
  this.contadorDesc = 0;

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
      this.imagenBotonIzq.src= "./assets/images/izquierda.png";
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

        this.imagen.classList.add("tablero-mobile")
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
      this.imagenBotonDer.src= "./assets/images/derecha.png";
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
      this.mano[i].seleccionado= false;
    }
  }
  agregarMano(carta: Carta | undefined){
    if (carta) {
      this.mano.push(carta);
    }
  }

  iniciarMano(){
    let carta: any;
    for(let cont =1; cont <=5; cont++){
      carta = <Carta>this.baraja.pop()
      this.imagen.classList.add("mano-mobile")
      this.mano.push(carta);
    }
  }

  botonDescartar():void {
    let  manoProv: Carta[];
    this.mano.forEach((value, index) => {
        if(value.seleccionado == true){
          this.contadorDesc++;
          this.descartadas.push(value)
          console.log(this.descartadas)
          console.log(index)
        }
    })

    if(this.descartadas.length > 0){
      console.log(this.descartadas.length)
      console.log(this.descartadas[0].numeroDescarte)
      if(this.descartadas.length+1 >= this.descartadas[0].numeroDescarte){

        this.descarte = this.descarte.concat(this.descartadas);
        console.log(this.descartadas)
        let manoProvi = document.querySelector('#mano')
        let manoFinal = document.createElement("div");
        // @ts-ignore
        while(manoProvi.lastChild){
        // @ts-ignore
          console.log(manoProvi.lastChild.id)
          // @ts-ignore
          console.log(this.descartadas[0].id)
          // @ts-ignore
          if(manoProvi.lastChild.id === "mano"+this.descartadas[0].id){
            // @ts-ignore
            manoProvi.removeChild(manoProvi.lastChild);
          }else{
            // @ts-ignore
            manoFinal = manoProvi.removeChild(manoProvi.lastChild);
          }
        }
        manoProvi= manoFinal;
      }
    }
    this.descartadas=[];
this.contadorDesc=0;
  }
  descartar():void{
    this.barajaService.addBaraja(this.descarte, this.descartadas);
  }

  //funcion para el boton izq
  botonizq(boton: HTMLButtonElement, fila: string){

    boton.addEventListener("click",()=>{
      let filaProv:any;
      let botonizq:any;
      let botonder:any;
      let restoFila:any;
      let cartas:Carta[];
      let repetida:boolean=false;

      let filaCompr :HTMLDivElement;
      filaProv = document.querySelector("#"+fila);
      filaCompr = document.createElement("div");
      restoFila = document.createElement("div");

      if(this.mano.length>0) {
        cartas = this.robarmano();
        if (cartas.length > 0) {

          botonizq = filaProv.removeChild(filaProv.firstChild)
          botonder = filaProv.removeChild(filaProv.lastChild);

          while (filaProv.firstChild){
            if(cartas[0].nombre == filaProv.firstChild.id){
              repetida = true;
              break;
            }else{
              // @ts-ignore
              filaCompr.appendChild(filaProv.firstChild);
            }
          }
          while (filaProv.firstChild){
            restoFila.appendChild(filaProv.firstChild)
          }
          filaProv.appendChild(botonizq);
          if(!repetida){ // si encuentra alguna
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

            while (filaCompr.firstChild){
              filaProv.appendChild(filaCompr.firstChild);
            }
          }else{
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

              this.imagen.classList.add("tablero-mobile")
              this.casilla.appendChild(this.imagen);// insertar imagen en la ficha
              // @ts-ignore

              filaProv.appendChild(this.casilla);// insertar la casilla en la fila
            }
          }
          while (filaCompr.lastChild){

            // @ts-ignore
            this.barajaService.find(filaCompr.lastChild.id).subscribe((data: Carta)=> {
              this.cartaRepe = data;
              this.cartaRepe.seleccionado = false;
              this.mano.push(this.cartaRepe)

            });
            // @ts-ignore
            filaCompr.removeChild(filaCompr.lastChild)
          }

          }
          while (restoFila.firstChild) {
            filaProv.appendChild(restoFila.removeChild(restoFila.firstChild))
          }
        filaProv.appendChild(botonder)
        }
    });// Funcion insertar por delante
  }

  encuentraCarta(id:string):Carta{
    let cartaProvi !: Carta;
    this.barajaService.find(id).subscribe((data: Carta)=> {
      cartaProvi = data;
    })
    return cartaProvi;
  }

  botonDer(boton: HTMLButtonElement, fila:string){

    boton.addEventListener("click",()=>{
      let filaProv:any;
      let botonDere:any;
      let cartas :Carta[];//Cartas que vienen de la mano
      let repetida : boolean = false;
      let botonIzq :any;
      let filaCompr :HTMLDivElement;
      let filaTemp : HTMLDivElement;


      this.imagen = document.createElement("img");
      this.casilla =  document.createElement("div");
      filaProv = document.querySelector("#"+fila);
      filaCompr = document.createElement("div");
      filaTemp = document.createElement("div");

      if(this.mano.length>0){
        cartas=this.robarmano();
        if(cartas.length>0){
          //quitamos los botones y los guardamos en variables temporales
          botonDere = filaProv.lastChild;
          filaProv.removeChild(filaProv.lastChild);
          botonIzq = filaProv.firstChild;
          filaProv.removeChild(filaProv.firstChild);

          while(filaProv.lastChild){ // guarda las cartas hasta que encuentre alguna repetida
            if(cartas[0].nombre == filaProv.lastChild.id){
              repetida = true;
              break;
            }else{
              filaCompr.appendChild(filaProv.lastChild);
            }
          }


          if(!repetida){ // si encuentra alguna
            filaProv.appendChild(botonIzq);
            while (filaCompr.lastChild){
              filaProv.appendChild(filaCompr.lastChild)
            }
          }else{
            filaTemp.appendChild(botonIzq)
            while(filaProv.firstChild){
              filaTemp.appendChild(filaProv.firstChild);
            }
            while (filaTemp.firstChild){
              filaProv.appendChild(filaTemp.firstChild);
            }

            // @ts-ignore

            while (filaCompr.lastChild){

              // @ts-ignore
              this.barajaService.find(filaCompr.lastChild.id).subscribe((data: Carta)=> {
                this.cartaRepe = data;
                this.cartaRepe.seleccionado = false;
                this.mano.push(this.cartaRepe)
              });
              // @ts-ignore
              filaCompr.removeChild(filaCompr.lastChild)
            }

          }
          //mete las cartas seleccionadas en la fila por la derecha

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
            this.casilla.className += " tablero-mobile";
            filaProv.appendChild(this.casilla);// insertar la casilla en la fila
          }
          filaProv.appendChild(botonDere); // insertamos el boton al final de la fila
        }
      }
    });// Funcion insertar por detras
  }
  // prueba echar carta, nombre regu, dar una vuelta
  cartaSeleccionada(carta: Carta){
    for(let i = 0; i<this.mano.length; i++){
      this.mano[i].seleccionado= false;
    }
    /*this.mano.forEach(value => {
      value.seleccionado=false;
    })*/
    carta.seleccionado=true;
    this.aumentar(carta);
  }

  // pone las cartas de la mano con 80px
  aumentar(carta:Carta):void{
    let manoProvi !: NodeListOf<HTMLDivElement>;
    for (let i = 0; i < this.mano.length; i++){
      // @ts-ignore
      if(this.mano[i].nombre == carta.nombre){
        manoProvi = document.querySelectorAll("#mano"+ carta.nombre);
        console.log(manoProvi)
        this.mano[i].seleccionado = true;
        for (let j = 0; j < manoProvi.length; j++){
          // @ts-ignore
          manoProvi.item(j).style= "width:80px";
        }

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
