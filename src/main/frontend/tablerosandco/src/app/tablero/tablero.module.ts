import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DragDropModule} from "@angular/cdk/drag-drop";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {TableroComponent} from "./tablero/tablero.component";
import {BarajaComponent} from "../baraja/baraja/baraja.component";


@NgModule({
  declarations: [TableroComponent, BarajaComponent], // Baraja va aqui?
  imports: [
    CommonModule,
    DragDropModule,
    BrowserAnimationsModule
  ],exports:[
    TableroComponent
    , BarajaComponent
  ]
})
export class TableroModule { }
