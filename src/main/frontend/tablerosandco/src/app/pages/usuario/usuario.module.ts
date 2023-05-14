import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UsuarioComponent} from "./crear/usuario.component";



@NgModule({
  declarations: [UsuarioComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],exports:[UsuarioComponent]
})
export class UsuarioModule { }
