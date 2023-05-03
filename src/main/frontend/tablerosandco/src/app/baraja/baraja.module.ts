import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BarajaComponent} from "./baraja/baraja.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {DragDropModule} from "@angular/cdk/drag-drop";
import { ManoComponent } from './mano/mano.component';
import { DescarteComponent } from './descarte/descarte.component';
import {TableroModule} from "../tablero/tablero.module";



@NgModule({
  declarations: [
    ManoComponent, // dar una vuelta a los componentes en que modulo y orden
    DescarteComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DragDropModule
  ], exports: [
    DescarteComponent,
    ManoComponent
  ]

})
export class BarajaModule {

}
