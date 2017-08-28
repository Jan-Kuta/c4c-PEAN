import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Response } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import * as fromApp from '../../store/app.reducers';
import * as AlertActions from '../../alert/store/alert.actions';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService, private store: Store<fromApp.AppState>) { }

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
          this.store.dispatch(new AlertActions.ShowErrorMessage({message: error, keepAfterNavigationChange: false}));
        }
      );
  }

}
