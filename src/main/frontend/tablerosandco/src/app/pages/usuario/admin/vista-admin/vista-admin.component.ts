import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../security/Auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-vista-admin',
  templateUrl: './vista-admin.component.html',
  styleUrls: ['./vista-admin.component.css']
})
export class VistaAdminComponent implements OnInit{

  constructor(private authService: AuthService,private router: Router ) {
  }
  ngOnInit() {
    if(this.authService.logueado() && !this.authService.hasRole("ROL_ADMIN")){
      this.router.navigateByUrl("logueado")
    }
  }
}
