import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {JuegoService} from "../../../../principal/juego.service";

@Component({
  selector: 'app-crear-juego',
  templateUrl: './crear-juego.component.html',
  styleUrls: ['./crear-juego.component.css']
})
export class CrearJuegoComponent {


  formlogin!: FormGroup;
  constructor(private formBuilder: FormBuilder, private juegoService:JuegoService,private router: Router) {

    this.formlogin= this.formBuilder.group({
      name: ['', Validators.required],
      fotoPrinc: ['', [Validators.required, Validators.minLength(10)]],
      fotoHexa: ['', [Validators.required, Validators.minLength(10)]],
      descripcion: ['', [Validators.required, Validators.minLength(50)]]
    });
  }
}
