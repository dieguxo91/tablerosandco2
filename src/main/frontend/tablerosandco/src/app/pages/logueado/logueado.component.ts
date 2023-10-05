import { Component } from '@angular/core';
import {Juego_interface} from "../principal/juego_interface";
import {UsuarioComponent} from "../usuario/crear/usuario.component";
import {JuegoService} from "../principal/juego.service";
import {Subject} from "rxjs";

@Component({
  selector: 'app-logueado',
  templateUrl: './logueado.component.html',
  styleUrls: ['./logueado.component.css']
})
export class LogueadoComponent {
  searchTerm = new Subject<string>();
  juegos!: Juego_interface[];

  constructor(private usuario:UsuarioComponent ,private juegoService: JuegoService) {
  }

  ngOnInit(): void {
    this.juegoService.getAll().subscribe((data: Juego_interface[])=>{
      this.juegos= data;
    })
  }

  buscar(nombre : string){


    this.juegoService.getAll().subscribe((data:Juego_interface[])=>{
      this.juegos=data;
      this.juegos= this.juegos.filter(value => value.name.toUpperCase().includes(nombre.toUpperCase()) );
      console.log("Busqueda de " + nombre)
      if(nombre == ""){
        this.ngOnInit()
      }
    });
  }

}
