import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UsuarioComponent} from "./crear/usuario.component";
import {HttpClientModule} from "@angular/common/http";
import { IndexComponent } from './admin/index/index.component';
import { EditUsuarioComponent } from './admin/edit/edit-Usuario.component';
import { VistaAdminComponent } from './admin/vista-admin/vista-admin.component';
import { ListarComponent } from './admin/game/listar/listar.component';
import {RouterLink, RouterOutlet} from "@angular/router";
import { CrearJuegoComponent } from './admin/game/crear-juego/crear-juego.component';
import { EditarJuegoComponent } from './admin/game/editar-juego/editar-juego.component';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';


@NgModule({
  declarations: [UsuarioComponent, IndexComponent, EditUsuarioComponent, VistaAdminComponent, ListarComponent, CrearJuegoComponent, EditarJuegoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterOutlet,
    RouterLink,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ],exports:[UsuarioComponent]
})
export class UsuarioModule { }
