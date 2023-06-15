import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {TableroModule} from "./tablero/tablero.module";
import { HeaderComponent } from './shared/header/header.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { FooterComponent } from './shared/footer/footer.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import {UsuarioModule} from "./pages/usuario/usuario.module";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import { LogueadoComponent } from './pages/logueado/logueado.component';
import { HttpRequestInterceptor} from "./security/HttpRequestInterceptor";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PrincipalComponent,
    LogueadoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TableroModule,
    NgbModule,
    UsuarioModule,
    FormsModule,
    RouterModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule
  ],
  providers: [HttpRequestInterceptor
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
