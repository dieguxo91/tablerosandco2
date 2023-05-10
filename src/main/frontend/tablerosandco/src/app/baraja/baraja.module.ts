import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BarajaComponent} from "./baraja/baraja.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {DragDropModule} from "@angular/cdk/drag-drop";
import { DescarteComponent } from './descarte/descarte.component';



@NgModule({
  declarations: [
    DescarteComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DragDropModule
  ], exports: [
    DescarteComponent,
  ]

})
export class BarajaModule {

}
