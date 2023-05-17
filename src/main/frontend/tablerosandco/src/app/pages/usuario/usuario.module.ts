import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UsuarioComponent} from "./crear/usuario.component";
import {HttpClientModule} from "@angular/common/http";
import { IndexComponent } from './admin/index/index.component';
import { EditComponent } from './admin/edit/edit.component';
import { AsideComponent } from './admin/aside/aside.component';
import { VistaAdminComponent } from './admin/vista-admin/vista-admin.component';
import { ListarComponent } from './admin/game/listar/listar.component';
import {RouterLink, RouterOutlet} from "@angular/router";


@NgModule({
  declarations: [UsuarioComponent, IndexComponent, EditComponent,  AsideComponent, VistaAdminComponent, ListarComponent],
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
