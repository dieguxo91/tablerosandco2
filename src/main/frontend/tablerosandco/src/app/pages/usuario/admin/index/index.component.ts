import { Component } from '@angular/core';
import {UsuarioService} from "../../usuario.service";
import {Usuario_interface} from "../../usuario_interface";


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

  delete(id: any){
    this.usuarioService.delete(id).subscribe(res => {
      this.usuarios = this.usuarios.filter(usu => usu.id_user !== id);
      console.log('Usuario id =' + id + ' eliminado!');
    })
  }

}
