import { Component } from '@angular/core';
import {Juego_interface} from "../../../../principal/juego_interface";
import {JuegoService} from "../../../../principal/juego.service";

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent {

  juegos!: Juego_interface[];

  constructor(private juegoService: JuegoService) {
    this.juegoService.getAll().subscribe((data: Juego_interface[])=>{
      this.juegos= data;
    })
  }

  delete(id: any){
    console.log(id)
    this.juegoService.delete(id).subscribe(res => {
      this.juegos = this.juegos.filter(juego => juego.id_juego !== id);
      console.log('Juego id =' + id + ' eliminado!');
    })
  }
}
