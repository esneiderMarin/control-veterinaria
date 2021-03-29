import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  clave: string;
  constructor(
    private router: Router,
    private flashMessages: FlashMessagesService,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.loginService.getAuth().subscribe(auth => {
      if (auth) {
        this.router.navigate(['/']);
      }
    });
  }

  login() {
    this.loginService
      .login(this.email, this.clave)
      .then(res => {
        this.router.navigate(['/']);
      })
      .catch(error => {
        this.flashMessages.show(error.message, {
          cssClass: 'alert-danger',
          timeout: 4000
        });
      });
  }

  // login() {
  //   var credential = this.loginService.loginWithEmail(this.email, this.clave)
  //     .toJSON;

  //   var auth = this.loginService.getAuth();
  // }
}
