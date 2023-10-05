import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DragDropModule} from "@angular/cdk/drag-drop";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {TableroComponent} from "./tablero/tablero/tablero.component";
import {BarajaComponent} from "./baraja/baraja/baraja.component";
import { SakuraComponent } from './sakura/sakura.component';


@NgModule({
  declarations: [TableroComponent, BarajaComponent, SakuraComponent],
  imports: [
    CommonModule,
    DragDropModule,
    BrowserAnimationsModule
  ],exports:[
    TableroComponent,
    BarajaComponent, 
    SakuraComponent
  ]
})
export class TableroModule { }
