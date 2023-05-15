import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UsuarioComponent} from "./crear/usuario.component";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [UsuarioComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],exports:[UsuarioComponent]
})
export class UsuarioModule { }
