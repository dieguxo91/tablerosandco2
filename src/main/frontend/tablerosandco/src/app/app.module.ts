import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableroComponent } from './tablero/tablero/tablero.component';
import {BarajaComponent} from "./baraja/baraja/baraja.component";
import {BarajaModule} from "./baraja/baraja.module";



@NgModule({
  declarations: [
    AppComponent,
    TableroComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BarajaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
