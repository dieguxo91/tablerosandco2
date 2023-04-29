import {AfterContentInit, Component, EventEmitter, Injectable, OnInit, Output, ViewChild} from '@angular/core';
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
export class BarajaComponent implements AfterContentInit{

   cartas : Cartas[] =[];
   baraja : Cartas[]=[];


  constructor( private barajaservice: BarajaService, private manoComponent : ManoComponent) {
  }

  ngOnInit(): void {
    this.barajaservice.getAll().subscribe((data: Cartas[])=>{
      this.cartas= data;
      this.baraja = this.barajaservice.llenarbaraja(this.cartas);
      this.barajaservice.barajar(this.baraja);
      this.ngAfterContentInit()
    })
  }

  drop(event: CdkDragDrop<Cartas[]>){
    moveItemInArray(this.cartas, event.previousIndex, event.currentIndex)
  }


  setBaraja(barajaDes: Cartas[]):void{
    this.baraja = barajaDes;
  }

  robar():Cartas{
    // @ts-ignore
    return this.baraja.pop();
  }

  ngAfterContentInit(): void {
    for (let num=0; num < 5; num++){
      let cartaRob = this.robar();
      console.log(cartaRob)
      this.manoComponent.agregarMano(cartaRob);
    }
  }



}
