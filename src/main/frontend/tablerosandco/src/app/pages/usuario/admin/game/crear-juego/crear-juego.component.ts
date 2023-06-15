import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {JuegoService} from "../../../../principal/juego.service";
import {Usuario_interface} from "../../../usuario_interface";
import {UsuarioService} from "../../../usuario.service";

@Component({
  selector: 'app-crear-juego',
  templateUrl: './crear-juego.component.html',
  styleUrls: ['./crear-juego.component.css']
})
export class CrearJuegoComponent {

  usuario!:Usuario_interface;
  admin!:Usuario_interface[];
  formlogin!: FormGroup;
  constructor(private formBuilder: FormBuilder, private juegoService:JuegoService,private router: Router, private usuarioService : UsuarioService) {
    this.usuarioService.getAdmin().subscribe((data: Usuario_interface[])=>{
      this.admin= data;
    })

    this.formlogin= this.formBuilder.group({
      name: ['', Validators.required],
      url: ['', [Validators.required, Validators.minLength(10)]],
      urlHexa: ['', [Validators.required, Validators.minLength(10)]],
      description: ['', [Validators.required, Validators.minLength(50)]],
      id_admin:['']
    });


  }



  enviar():void{

    let id = this.formlogin.get("id_admin")?.value;

    this.usuarioService.find(id).subscribe((data:Usuario_interface) =>{

      this.usuario = data;
      this.formlogin.get("id_admin")?.setValue(this.usuario);
      this.juegoService.create(this.formlogin.value).subscribe(res => {
        console.log('Juego creado');
        this.router.navigateByUrl('logueado').then();
      })
    })

  }
}
