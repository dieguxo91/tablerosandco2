import {Component, Injectable, OnInit, Output, EventEmitter} from '@angular/core';
import {BarajaService} from "../baraja.service";
import {Carta} from "../carta_inteface";

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-baraja',
  templateUrl: './baraja.component.html',
  styleUrls: ['./baraja.component.css']
})
export class BarajaComponent implements OnInit{

  @Output() onChildInit: EventEmitter<any> = new EventEmitter<any>();

  baraja: Carta[] =[];
  cartas!: Carta[];

  reverso!: string;


  constructor( private barajaservice: BarajaService) {
  }

  ngOnInit(): void {
    this.rellenarMazo();
  }


  rellenarMazo():void{
    this.barajaservice.getAll().subscribe((data: Carta[])=>{
      this.cartas= data;
      this.baraja = this.barajaservice.barajar(this.barajaservice.maze_full(this.cartas));
      this.onChildInit.emit(this.baraja); // para lanzar a la vista
      this.reverso = this.barajaReverso().reverso;
    })
  }

  barajaReverso():Carta{
    // @ts-ignore
    return this.baraja.at(this.baraja.length-1);
  }

  getCartas():Carta[] | undefined{
    return this.baraja;
  }

  setBaraja(barajaDes: Carta[]):void{
    this.baraja = barajaDes;
  }








}
