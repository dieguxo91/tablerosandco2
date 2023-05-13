import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableroComponent } from './tablero/tablero/tablero.component';
import {BarajaModule} from "./baraja/baraja.module";
import {TableroModule} from "./tablero/tablero.module";
import { HeaderComponent } from './body/header/header.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { FooterComponent } from './body/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BarajaModule,
    TableroModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
