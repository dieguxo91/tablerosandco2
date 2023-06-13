import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UsuarioComponent} from "./crear/usuario.component";
import {HttpClientModule} from "@angular/common/http";
import { IndexComponent } from './admin/user/index/index.component';
import { EditUsuarioComponent } from './admin/user/edit/edit-Usuario.component';
import { VistaAdminComponent } from './admin/vista-admin/vista-admin.component';
import { ListarComponent } from './admin/game/listar/listar.component';
import {RouterLink, RouterOutlet} from "@angular/router";
import { CrearJuegoComponent } from './admin/game/crear-juego/crear-juego.component';
import { EditarJuegoComponent } from './admin/game/editar-juego/editar-juego.component';
import { VerJuegoComponent } from './admin/game/ver-juego/ver-juego.component';
import { VerUsuarioComponent } from './admin/user/ver-usuario/ver-usuario.component';
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {MatIconModule} from "@angular/material/icon";



@NgModule({
  declarations: [UsuarioComponent, IndexComponent, EditUsuarioComponent, VistaAdminComponent, ListarComponent, CrearJuegoComponent, EditarJuegoComponent, VerJuegoComponent, VerUsuarioComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterOutlet,
    RouterLink,
    MatButtonModule,
    MatDividerModule,
    MatIconModule
  ],exports:[UsuarioComponent]
})
export class UsuarioModule { }
