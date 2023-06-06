import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {JuegoService} from "../../../principal/juego.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Usuario_interface} from "../../usuario_interface";
import {Juego_interface} from "../../../principal/juego_interface";

@Component({
  selector: 'app-editar-juego',
  templateUrl: './editar-juego.component.html',
  styleUrls: ['./editar-juego.component.css']
})
export class EditarJuegoComponent implements OnInit{
  formlogin!: FormGroup;
  id: number = 1;
  juego: Juego_interface = {id_juego : this.id,name:"0", url:"0", urlHexa: "0", description:"0",id_admin:2};
  constructor(private formBuilder: FormBuilder, private juegoService:JuegoService,private router: Router,private routes: ActivatedRoute) {

    this.formlogin = this.formBuilder.group({
      name: ['', Validators.required],
      fotoPrinc: ['', Validators.required],
      fotoHexa: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.id = this.routes.snapshot.params['idJuego'];

      this.juegoService.find(this.id).subscribe((data: Juego_interface)=>{
      this.juego = data;
      this.formlogin.get('name')?.setValue(this.juego.name);
      this.formlogin.get('descripcion')?.setValue(this.juego.description);
      this.formlogin.get('fotoHexa')?.setValue(this.juego.urlHexa);
      this.formlogin.get('fotoPrinc')?.setValue(this.juego.url);
    });
  }

  submit(){
    this.id = this.routes.snapshot.params['idJuego'];
    console.log(this.id)
    this.juegoService.update(this.id, this.formlogin.value).subscribe(res => {
      console.log('Juego actualizado satisfactoriamente!');
      this.router.navigateByUrl('admin/juegos').then();
    })
  }
}
