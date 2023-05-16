import { Component } from '@angular/core';
import {UsuarioService} from "../../usuario.service";
import {Usuario_interface} from "../../usuario_interface";
import {Juego_interface} from "../../../principal/juego_interface";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent  {

  usuarios!: Usuario_interface[];

  constructor(private usuarioService: UsuarioService) {
    this.usuarioService.getAll().subscribe((data: Usuario_interface[])=>{
      this.usuarios= data;
    })
  }

}
