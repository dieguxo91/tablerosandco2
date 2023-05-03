import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableroComponent } from './tablero/tablero/tablero.component';
import {BarajaModule} from "./baraja/baraja.module";
import {TableroModule} from "./tablero/tablero.module";


@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BarajaModule,
    TableroModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
