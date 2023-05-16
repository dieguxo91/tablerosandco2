import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UsuarioComponent} from "./crear/usuario.component";
import {HttpClientModule} from "@angular/common/http";
import { IndexComponent } from './admin/index/index.component';
import { EditComponent } from './admin/edit/edit.component';
import { GameComponent } from './admin/game/game.component';
import { AsideComponent } from './admin/aside/aside.component';
import { VistaAdminComponent } from './admin/vista-admin/vista-admin.component';


@NgModule({
  declarations: [UsuarioComponent, IndexComponent, EditComponent,  GameComponent, AsideComponent, VistaAdminComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],exports:[UsuarioComponent]
})
export class UsuarioModule { }
