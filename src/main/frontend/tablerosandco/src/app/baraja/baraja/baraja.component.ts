import { Component } from '@angular/core';
import {BarajaService} from "../baraja.service";
import {baraja} from "../baraja_inteface";

@Component({
  selector: 'app-baraja',
  templateUrl: './baraja.component.html',
  styleUrls: ['./baraja.component.css']
})
export class BarajaComponent {

  cartas : any[]=[];

  constructor( private barajaservice: BarajaService) {
  }

  ngOnInit(): void {
    this.cartas= this.barajaservice.getAll();

  }
}
