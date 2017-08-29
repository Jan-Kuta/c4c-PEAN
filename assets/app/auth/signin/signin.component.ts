import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import * as AlertActions from '../../alert/store/alert.actions';
import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  redirect: boolean = false;

  constructor(private router: Router, private store: Store<fromApp.AppState>) {}

  ngOnInit() {
  }

  // sign in by email and password
  onSignin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    this.store.dispatch(new AuthActions.TrySignin({ email: email, password: password}));
  }

  // login by facebook account
  onFacebookLogin(){
    //this.authService.loginFacebook();
  }

  // login by twitter account
  onTwitterLogin(){
    //this.authService.loginTwitter();
  }

  // login by google account
  onGoogleLogin(){
    //this.authService.loginGoogle();
  }

}
