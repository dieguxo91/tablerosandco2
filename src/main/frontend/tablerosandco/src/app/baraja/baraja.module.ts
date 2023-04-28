import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BarajaComponent} from "./baraja/baraja.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {DragDropModule} from "@angular/cdk/drag-drop";
import { ManoComponent } from './mano/mano.component';
import { DescarteComponent } from './descarte/descarte.component';



@NgModule({
  declarations: [
    BarajaComponent,
    ManoComponent,
    DescarteComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DragDropModule,
  ], exports: [
    BarajaComponent,
    DescarteComponent,
    ManoComponent
  ]

})
export class BarajaModule {

}
