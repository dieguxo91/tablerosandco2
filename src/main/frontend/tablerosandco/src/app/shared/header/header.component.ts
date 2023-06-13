import { Component } from '@angular/core';
import {AuthService} from "../../security/Auth.service";
import {Router} from "@angular/router";
import {StorageService} from "../../security/Storage.service";
import {HttpRequestInterceptor} from "../../security/HttpRequestInterceptor";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  form: any = {
    usernameLogin: null,
    passwordLogin: null
  };
  form2: any = {
    usernameLogin2: null,
    passwordLogin2: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  nombre !: string;

  constructor(private authService: AuthService,
              private storageService: StorageService,
              private router: Router) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
      this.nombre = this.storageService.getUser().username;
      this.router.navigateByUrl('logueado')
    }else{
      this.router.navigateByUrl('inicio');
    }
  }

  logout():void{
    this.router.navigateByUrl('inicio')
    this.reloadPage()
    this.authService.logout()
  }

  enviar2():void{
    const { usernameLogin2, passwordLogin2 } = this.form2;

    this.authService.login(usernameLogin2, passwordLogin2).subscribe({
      next: data => {
        console.log(data)
        this.storageService.clean();
        this.storageService.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        console.log('isLoggedIn = '+ this.isLoggedIn);
        this.roles = this.storageService.getUser().roles;
        this.reloadPage();
      },
      error: err => {
        this.errorMessage = "Usuario incorrecto";
        this.isLoginFailed = true;
      }
    });
  }
  enviar(): void {
    const { usernameLogin, passwordLogin } = this.form;

    this.authService.login(usernameLogin, passwordLogin).subscribe({
      next: data => {
        console.log(data)
        this.storageService.clean();
        this.storageService.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        console.log('isLoggedIn = '+ this.isLoggedIn);
        this.roles = this.storageService.getUser().roles;
        this.reloadPage();

      },
      error: err => {
        this.errorMessage = "Usuario incorrecto";
        this.isLoginFailed = true;
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
}
