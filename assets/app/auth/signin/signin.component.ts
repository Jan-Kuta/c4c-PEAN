import { AlertService } from './../../alert/alert.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private authService: AuthService, private alertService: AlertService) { }

  ngOnInit() {
  }

  onSignin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signinUser(email, password)
      .subscribe(
        (response: any) => {
          console.log(response);
          localStorage.setItem('token', response.token);
        },
        (error) => {
          console.log(error);
          this.alertService.error('Bad credentials');
        }
      );
  }

}
