import { AlertService } from './../../alert/alert.service';
import { Router } from '@angular/router';
import { Response } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService, private alertService: AlertService) { }

  ngOnInit() {
  }

  onSignup(form: NgForm) {
    const username = form.value.username;
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signupUser(username, email, password)
      .subscribe(
        (response: any) => {
          console.log(response);
          this.router.navigate(['/']);
        },
        (error) => {
          console.log(error);
          this.alertService.error(error);
        }
      );
  }

}
