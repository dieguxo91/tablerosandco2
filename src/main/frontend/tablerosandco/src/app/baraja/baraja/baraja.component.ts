import {Component, Injectable, Input, OnInit, ViewChild,} from '@angular/core';
import {BarajaService} from "../baraja.service";
import {Cartas} from "../cartas_inteface";
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {ManoComponent} from "../mano/mano.component";

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-baraja',
  templateUrl: './baraja.component.html',
  styleUrls: ['./baraja.component.css']
})
export class BarajaComponent implements OnInit{

  @Input()baraja : Cartas[]|undefined;

   cartas : Cartas[] =[];



   mano: Cartas[]=[];

  constructor( private barajaservice: BarajaService, private manoComponent : ManoComponent) {

  }

  ngOnInit(): void {
    this.rellenarMazo();
  }


  rellenarMazo():void{
    this.barajaservice.getAll().subscribe((data: Cartas[])=>{
      this.cartas= data;
      this.baraja = this.barajaservice.barajar(this.barajaservice.maze_full(this.cartas));
    })
  }

  barajaReverso():Cartas{ //mejor en el service, dar una vuelta
    // @ts-ignore
    return this.baraja.at(this.baraja.length-1);
  }


  drop(event: CdkDragDrop<Cartas[]>){
    moveItemInArray(this.cartas, event.previousIndex, event.currentIndex)
  }

  getCartas():Cartas[] | undefined{
    return this.baraja;
  }

  setBaraja(barajaDes: Cartas[]):void{
    this.baraja = barajaDes;
  }

  robar():void{
     // @ts-ignore
    this.mano= this.manoComponent.agregarMano(this.baraja.pop());

  }






}
