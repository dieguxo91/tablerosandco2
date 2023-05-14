import {Component, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";
import {UsuarioService} from "../usuario.service";



@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  formlogin!: FormGroup;


  constructor(private formBuilder: FormBuilder, private usuarioService: UsuarioService ) {

    this.formlogin= this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.minLength(9)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      apodo: ['', [Validators.required, Validators.minLength(6)]],
      repeat_password: ['',[Validators.required, Validators.minLength(6)]],
      apellidos: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  enviar(){
    console.log(this.formlogin.value);
    this.usuarioService.create(this.formlogin.value).subscribe(res => {
      console.log('Usuario creado');
      //this.router.navigateByUrl('categoria/index').then();
    })
  }






  distntas(pas1: string, pas2: string){
    if(pas1 !== pas2)
      return true;
    else
      return false;
  }

  ngOnInit(): void {
  }



}
