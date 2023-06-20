import {Component, OnInit} from '@angular/core';
import {UsuarioService} from "../../../usuario.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Usuario_interface} from "../../../usuario_interface";
import {StorageService} from "../../../../../security/Storage.service";
import {AuthService} from "../../../../../security/Auth.service";

@Component({
  selector: 'app-edit',
  templateUrl: './edit-Usuario.component.html',
  styleUrls: ['./edit-Usuario.component.css']
})
export class EditUsuarioComponent implements OnInit{
form !: FormGroup;

constructor(private usuarioService : UsuarioService, private routes: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private authService: AuthService) {
  this.form = this.formBuilder.group({
    name: ['', [Validators.required ,Validators.minLength(3),Validators.pattern('^[A-Za-z]+$')]],
    email: ['', [Validators.required, Validators.email, Validators.pattern('^[^@]+@[^@]+\\.[a-zA-Z]{2,}$')]],
    telefono: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
    password: ['',[]],
    username: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^[A-Za-z0-9]+$')]],
    apellidos: ['', [Validators.required, Validators.minLength(3)]],
    roles:[],
  });

}

  id: number = 1;
  usuario!: Usuario_interface ;

  submit(){
    console.log(this.usuario)

      if(!this.form.get('password')?.value){
        this.form.get('password')?.setValue(this.usuario.password);
      }

    this.usuarioService.update(this.id, this.form.value).subscribe(res => {
      console.log('Usuario actualizado satisfactoriamente!');
      javascript:history.back()
    })


  }
  mostrar(){
    let password1 = document.querySelector('#password');

    // @ts-ignore
    if(password1.type == 'text'){
      // @ts-ignore
      password1.type = 'password';
    }else{
      // @ts-ignore
      password1.type = 'text';

    }
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
      this.form.get('roles')?.setValue(this.usuario.roles);
    });
  }
}
