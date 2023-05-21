import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UsuarioComponent} from "./crear/usuario.component";
import {HttpClientModule} from "@angular/common/http";
import { IndexComponent } from './admin/index/index.component';
import { EditUsuarioComponent } from './admin/edit/edit-Usuario.component';
import { AsideComponent } from './admin/aside/aside.component';
import { VistaAdminComponent } from './admin/vista-admin/vista-admin.component';
import { ListarComponent } from './admin/game/listar/listar.component';
import {RouterLink, RouterOutlet} from "@angular/router";
import { CrearJuegoComponent } from './admin/game/crear-juego/crear-juego.component';


@NgModule({
  declarations: [UsuarioComponent, IndexComponent, EditUsuarioComponent,  AsideComponent, VistaAdminComponent, ListarComponent, CrearJuegoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterOutlet,
    RouterLink
  ],exports:[UsuarioComponent]
})
export class UsuarioModule { }
