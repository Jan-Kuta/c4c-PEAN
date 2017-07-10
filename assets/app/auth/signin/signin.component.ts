import { Router } from '@angular/router';
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

  constructor(private router: Router, private authService: AuthService, private alertService: AlertService) { }

  ngOnInit() {
  }

  onSignin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signinUser(email, password)
      .subscribe(
        (response: any) => {
          console.log(response);
          this.router.navigate(['/']);          
        },
        (error) => {
          console.log(error);
          this.alertService.error('Bad credentials');
        }
      );
  }

  onFacebookLogin(){

    var newWindow = window.open('http://localhost:3000/api/user/auth/facebook', 'name', 'height=585, width=770');
	   if (window.focus) {
       newWindow.focus();
     }
     
    /*this.authService.facebookLogin()
      .subscribe(
        (response: any) => {
          console.log(response);
          this.alertService.success('Facebook logged in');          
        },
        (error) => {
          console.log(error);
          this.alertService.error('Facebook problem');
        }
      )*/


  }

}
