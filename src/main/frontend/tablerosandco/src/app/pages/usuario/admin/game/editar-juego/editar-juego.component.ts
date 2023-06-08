import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {JuegoService} from "../../../../principal/juego.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Usuario_interface} from "../../../usuario_interface";
import {Juego_interface} from "../../../../principal/juego_interface";
import {UsuarioService} from "../../../usuario.service";

@Component({
  selector: 'app-editar-juego',
  templateUrl: './editar-juego.component.html',
  styleUrls: ['./editar-juego.component.css']
})
export class EditarJuegoComponent implements OnInit{
  formlogin!: FormGroup;
  id: number = 1;
  id_admin!: number;
  juego!: Juego_interface;
  admin!: Usuario_interface[];

  usu !: Usuario_interface;
  constructor(private formBuilder: FormBuilder, private juegoService:JuegoService,private usuarioService:UsuarioService, private router: Router,private routes: ActivatedRoute) {

    this.usuarioService.getAdmin().subscribe((data: Usuario_interface[])=>{
      this.admin= data;
    })
    this.formlogin = this.formBuilder.group({
      name: ['', Validators.required],
      url: ['', Validators.required],
      urlHexa: ['', Validators.required],
      description: ['', Validators.required],
      id_admin:['']
    });
  }

  ngOnInit(): void {
    this.id = this.routes.snapshot.params['idJuego'];

      this.juegoService.find(this.id).subscribe((data: Juego_interface)=>{
      this.juego = data;
      this.usu = this.juego.id_admin;
        console.log(this.usu.id_user)
      this.formlogin.get('name')?.setValue(this.juego.name);
      this.formlogin.get('description')?.setValue(this.juego.description);
      this.formlogin.get('urlHexa')?.setValue(this.juego.urlHexa);
      this.formlogin.get('url')?.setValue(this.juego.url);
      this.formlogin.get('id_admin')?.setValue(this.usu.id_user);
    });
  }

  submit() {
    this.id_admin = this.formlogin.get('id_admin')?.value;
    this.usuarioService.find(this.id_admin).subscribe((data: Usuario_interface) => {
      this.usu = data;
      console.log(this.usu)
      this.formlogin.get("id_admin")?.setValue(this.usu);
      console.log(this.formlogin)
      this.id = this.routes.snapshot.params['idJuego'];
      console.log(this.id)
      this.juegoService.update(this.id, this.formlogin.value).subscribe(res => {
        console.log('Juego actualizado satisfactoriamente!');
        this.router.navigateByUrl('admin/juegos').then();
      });
    });
  }
}
