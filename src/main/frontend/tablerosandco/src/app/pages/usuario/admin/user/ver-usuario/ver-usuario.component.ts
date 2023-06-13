import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Juego_interface} from "../../../../principal/juego_interface";
import {Usuario_interface} from "../../../usuario_interface";
import {UsuarioService} from "../../../usuario.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-ver-usuario',
  templateUrl: './ver-usuario.component.html',
  styleUrls: ['./ver-usuario.component.css']
})
export class VerUsuarioComponent {
  formlogin!: FormGroup;
  id: number = 1;
  juego!: Juego_interface;
  admin!: Usuario_interface[];
  usuario !: Usuario_interface;
  constructor(private formBuilder: FormBuilder,private usuarioService:UsuarioService, private router: Router,private routes: ActivatedRoute) {

    this.formlogin = this.formBuilder.group({
      id_user:[''],
      name: [''],
      email: [''],
      telefono: [''],
      password: [''],
      username: [''],
      apellidos: ['']
    });
  }

  ngOnInit(): void {
    this.id = this.routes.snapshot.params['idUsuario'];
    this.usuarioService.find(this.id).subscribe((data: Usuario_interface)=>{
      this.usuario = data;
      this.formlogin.get('id_user')?.setValue(this.usuario.id_user);
      this.formlogin.get('name')?.setValue(this.usuario.name);
      this.formlogin.get('email')?.setValue(this.usuario.email);
      this.formlogin.get('username')?.setValue(this.usuario.username);
      this.formlogin.get('apellidos')?.setValue(this.usuario.apellidos);
      this.formlogin.get('telefono')?.setValue(this.usuario.telefono);
      this.formlogin.get('password')?.setValue(this.usuario.password);
    });
  }

}
