import {Component, Injectable, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";
import {UsuarioService} from "../usuario.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  formlogin!: FormGroup;

  private admin :boolean=true;

  private logueado:boolean=false;

  constructor(private formBuilder: FormBuilder, private usuarioService: UsuarioService,private router: Router) {

    this.formlogin= this.formBuilder.group({
      name: ['', Validators.required, Validators.minLength(3)],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[^@]+@[^@]+\\.[a-zA-Z]{2,}$')]],
      telefono: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern("^(?=.*[A-Z])(?=.*[a-z])(?=.*\d){6,}")]],
      username: ['', [Validators.required, Validators.minLength(6),Validators.pattern('^[A-Za-z0-9]+$')]],
      repeat_password: ['',[Validators.required, Validators.minLength(6)]],
      apellidos: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  enviar(){
    console.log(this.formlogin.value);
    this.usuarioService.create(this.formlogin.value).subscribe(res => {
      console.log('Usuario creado');
      this.router.navigateByUrl('inicio').then();
    })
  }

 getLogue():boolean{
    return this.logueado;
 }

 setLogue(estado:boolean):void{
    this.logueado=estado;
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
