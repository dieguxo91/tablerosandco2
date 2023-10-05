import { Component, OnInit } from '@angular/core';
import { Carta } from '../baraja/carta_inteface';

@Component({
  selector: 'app-sakura',
  templateUrl: './sakura.component.html',
  styleUrls: ['./sakura.component.css']
})
export class SakuraComponent implements OnInit {

  baraja : string[] =[] 
  mano : string[] =[]

  
  ngOnInit(): void {
    this.iniciarBaraja()
    this.iniciarMano()
  }

  iniciarBaraja():void{
    const nombres  = ['arrow','big','bubbles','change','cloud','create','dark','dash','dream','earthy','erase',
                        'fight','firey','float','flower','fly','freeze','glow','hope','illusion','jump','libra',
                        'light','little','lock','loop','maze','mirror','mist','move','power','rain','return','sand',
                        'shadow','shield','shot','silent','sleep','snow','song','storm','sweet','sword','through',
                        'thunder','time','twin','voice','watery','wave','windy','wood'];

    nombres.forEach(element => {
      this.baraja.push(element)
    });
    this.baraja.sort(() => Math.random() - 0.5);
  }

  iniciarMano():void{
    for (let index = 0; index < 5; index++) {
      this.mano.push(this.baraja[0]);
      this.baraja.splice(0,1);
    }
    
  }

  agregar():void{
    this.mano.push(this.baraja[0]);
    this.baraja.splice(0,1);
  }
  


}
