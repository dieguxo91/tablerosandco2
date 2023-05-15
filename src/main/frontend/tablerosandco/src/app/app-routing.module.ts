import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsuarioComponent} from "./pages/usuario/crear/usuario.component";
import {PrincipalComponent} from "./pages/principal/principal.component";
import {RegistradoComponent} from "./pages/registrado/registrado.component";
import {TableroComponent} from "./tablero/tablero/tablero.component";

const routes: Routes = [
  { path: 'crear', component: UsuarioComponent },
  { path: '', component: PrincipalComponent , pathMatch: "full" },
  { path: 'inicio', component: PrincipalComponent },
  { path: 'registradoPri', component: RegistradoComponent },
  { path: "**", redirectTo: "inicio", pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
