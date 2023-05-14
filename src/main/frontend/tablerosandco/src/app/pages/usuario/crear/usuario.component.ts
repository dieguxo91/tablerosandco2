import {Component, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup, ValidationErrors, ValidatorFn,
  Validators
} from "@angular/forms";
import {ValidarIguales} from "../validarIguales";
import {Observable, of} from "rxjs";


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit{
  formlogin!: FormGroup;


  constructor(private formBuilder: FormBuilder , private validacion:ValidarIguales) {

  }

  enviar(){
    console.log("enviando...")
  }

  ngOnInit(): void {
    this.iniciarForm();
  }

  iniciarForm(){
    this.formlogin= this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.minLength(9)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      apodo: ['', Validators.required, Validators.minLength(6)],
      apellidos: ['', [Validators.required, Validators.minLength(6)]],
      repeat_password: ['',[Validators.required, Validators.minLength(6)]]
    });
  }

  distntas(pas1: string, pas2: string){
    if(pas1 !== pas2)
      return true;
    else
      return false;
  }



}
