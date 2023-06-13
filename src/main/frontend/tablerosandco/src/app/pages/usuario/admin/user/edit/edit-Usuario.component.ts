import {Component, OnInit} from '@angular/core';
import {UsuarioService} from "../../../usuario.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Usuario_interface} from "../../../usuario_interface";

@Component({
  selector: 'app-edit',
  templateUrl: './edit-Usuario.component.html',
  styleUrls: ['./edit-Usuario.component.css']
})
export class EditUsuarioComponent implements OnInit{


constructor(private usuarioService : UsuarioService, private routes: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {
}
  form:FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    telefono: ['', Validators.required],
    password: ['', Validators.required],
    username: ['', Validators.required],
    apellidos: ['', Validators.required],
    roles:[],
  });

  id: number = 1;
  usuario!: Usuario_interface ;

  submit(){
    console.log(this.usuario)
    this.usuarioService.update(this.id, this.form.value).subscribe(res => {
      console.log('Usuario actualizado satisfactoriamente!');
      this.router.navigateByUrl('admin/usuarios').then();
    })
  }

  ngOnInit(): void {

    this.id = this.routes.snapshot.params['idUsuario'];
    this.usuarioService.find(this.id).subscribe((data: Usuario_interface)=>{
      this.usuario = data;
      this.form.get('name')?.setValue(this.usuario.name);
      this.form.get('email')?.setValue(this.usuario.email);
      this.form.get('username')?.setValue(this.usuario.username);
      this.form.get('apellidos')?.setValue(this.usuario.apellidos);
      this.form.get('telefono')?.setValue(this.usuario.telefono);
      this.form.get('password')?.setValue(this.usuario.password);
      this.form.get('roles')?.setValue(this.usuario.roles);
    });
  }
}
