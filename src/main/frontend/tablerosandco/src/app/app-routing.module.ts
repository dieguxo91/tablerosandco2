import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsuarioComponent} from "./pages/usuario/crear/usuario.component";
import {PrincipalComponent} from "./pages/principal/principal.component";
import {VistaAdminComponent} from "./pages/usuario/admin/vista-admin/vista-admin.component";
import {TableroComponent} from "./tablero/tablero/tablero.component";
import {ListarComponent} from "./pages/usuario/admin/game/listar/listar.component";
import {IndexComponent} from "./pages/usuario/admin/index/index.component";
import {EditUsuarioComponent} from "./pages/usuario/admin/edit/edit-Usuario.component";

const routes: Routes = [
  { path: 'crear', component: UsuarioComponent },
  { path: '', component: PrincipalComponent , pathMatch: "full" },
  { path: 'inicio', component: PrincipalComponent },
  { path: 'admin', component: VistaAdminComponent ,children:[
    {path: 'juegos', component: ListarComponent},
      {path: 'usuarios', component: IndexComponent }
    ]},
  { path: 'Usuario/edit/:idUsuario', component: EditUsuarioComponent },
  { path: 'inicio/galaxia', component: TableroComponent },
  { path: "**", redirectTo: "inicio", pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
