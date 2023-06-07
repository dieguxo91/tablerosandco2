import { Component } from '@angular/core';
import {Juego_interface} from "../../../../principal/juego_interface";
import {Usuario_interface} from "../../../usuario_interface";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {JuegoService} from "../../../../principal/juego.service";
import {UsuarioService} from "../../../usuario.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-ver-juego',
  templateUrl: './ver-juego.component.html',
  styleUrls: ['./ver-juego.component.css']
})
export class VerJuegoComponent {
  formlogin!: FormGroup;
  id: number = 1;
  juego!: Juego_interface;
  admin!: Usuario_interface[];

  usu !: Usuario_interface;
  constructor(private formBuilder: FormBuilder, private juegoService:JuegoService,private usuarioService:UsuarioService, private router: Router,private routes: ActivatedRoute) {

    this.usuarioService.getAdmin().subscribe((data: Usuario_interface[])=>{
      this.admin= data;
    })
    this.formlogin = this.formBuilder.group({
      name: ['',],
      url: ['',],
      urlHexa: ['',],
      description: ['',],
      id_admin:[''],
      id_juego:['']
    });
  }

  ngOnInit(): void {
    this.id = this.routes.snapshot.params['idJuego'];

    this.juegoService.find(this.id).subscribe((data: Juego_interface)=>{
      this.juego = data;
      this.usu = this.juego.id_admin;
      this.formlogin.get('id_juego')?.setValue(this.juego.id_juego);
      this.formlogin.get('name')?.setValue(this.juego.name);
      this.formlogin.get('description')?.setValue(this.juego.description);
      this.formlogin.get('urlHexa')?.setValue(this.juego.urlHexa);
      this.formlogin.get('url')?.setValue(this.juego.url);
      this.formlogin.get('id_admin')?.setValue(this.usu.id_user)
    });
  }


}
