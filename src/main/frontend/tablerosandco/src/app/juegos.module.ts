import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DragDropModule} from "@angular/cdk/drag-drop";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {TableroComponent} from "./tablero/tablero/tablero.component";
import {BarajaComponent} from "./baraja/baraja/baraja.component";
import { SakuraComponent } from './sakura/sakura.component';
import {MaquinaComponent} from './maquina/maquina.component';
import { NgxSplideModule } from 'ngx-splide';


@NgModule({
  declarations: [TableroComponent, BarajaComponent, SakuraComponent, MaquinaComponent],
  imports: [
    CommonModule,
    DragDropModule,
    BrowserAnimationsModule,
    NgxSplideModule
  ],exports:[
    TableroComponent,
    BarajaComponent, 
    SakuraComponent,
    MaquinaComponent
  ]
})
export class TableroModule { }
