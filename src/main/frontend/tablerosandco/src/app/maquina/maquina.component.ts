import { Component, OnInit } from '@angular/core';
import { NgxSplideSlideComponent } from 'ngx-splide';


@Component({
  selector: 'app-maquina',
  templateUrl: './maquina.component.html',
  styleUrls: ['./maquina.component.css'],
})
export class MaquinaComponent implements OnInit {

  ngOnInit(): void {
    this.iniciarBaraja()
  }

  baraja1 : string[] = [];
  baraja2 : string[] = [];
  baraja3 : string[] = [];

  iniciarBaraja():void{
    const nombres  = ['aerodactyl','bulbasur','charizard','dino','garchomp','groudon','mewtwo','pidgiotto',
                      'rayquaza','zapdos'];

    nombres.forEach(element => {
      this.baraja1.push(element)
    });
    this.baraja1.sort(() => Math.random() - 0.5);

    nombres.forEach(element => {
      this.baraja2.push(element)
    });
    this.baraja2.sort(() => Math.random() - 0.5);

    nombres.forEach(element => {
      this.baraja3.push(element)
    });
    this.baraja3.sort(() => Math.random() - 0.5);
  }


}
