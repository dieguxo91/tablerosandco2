import {Component, OnInit} from '@angular/core';
import {UsuarioComponent} from "../usuario/crear/usuario.component";
import {Juego_interface} from "./juego_interface";
import {JuegoService} from "./juego.service";
import {Carta} from "../../baraja/carta_inteface";

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit{

  juegos!: Juego_interface[];

  constructor(private usuario:UsuarioComponent ,private juegoService: JuegoService) {
  }

  noLogue(): boolean{
    return this.usuario.getLogue();
  }

  ngOnInit(): void {
    this.juegoService.getAll().subscribe((data: Juego_interface[])=>{
      this.juegos= data;
    })
  }



}
