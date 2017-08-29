import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import { fromPromise } from 'rxjs/observable/fromPromise';

import * as AuthActions from './auth.actions';
import * as AlertActions from '../../alert/store/alert.actions';

const Hello: any = require('hellojs');

@Injectable()
export class AuthEffects {

    constructor(private actions$: Actions, private router: Router, private http: Http) {}

  @Effect()
  authSignup = this.actions$
    .ofType(AuthActions.TRY_SIGNUP)
    .map((action: AuthActions.TrySignup) => {
      return action.payload;
    })
    .switchMap((authData: {username: string, email:String, password: string}) => {
      return this.http.post(
      '/api/user/register', 
      {
        "username": authData.username,
        "email": authData.email,
        "password": authData.password
      }, 
      {headers: new Headers({'Content-Type': 'application/json'})});
    })
    .map((response: Response) =>{
        return response.json();
      })
    .mergeMap((token: string) => {
      return [
        {
          type: AuthActions.SIGNUP
        },
        {
          type: AuthActions.SET_TOKEN,
          payload: token
        }
      ];
    });

  @Effect()
  authSignin = this.actions$
    .ofType(AuthActions.TRY_SIGNIN)
    .map((action: AuthActions.TrySignin) => {
      return action.payload;
    })
    .switchMap((authData: {email: string, password: string}) => {
      return this.http.post(
      '/api/user/login', 
      {
        "email": authData.email,
        "password": authData.password
      }, 
      {headers: new Headers({'Content-Type': 'application/json'})});
    })
    .map((response: Response) =>{
        return response.json();
      })
    .mergeMap((token: string) => {
      this.router.navigate(['/']);
      return [
        {
          type: AuthActions.SIGNIN
        },
        {
          type: AuthActions.SET_TOKEN,
          payload: token
        }
      ];
    })
    /*.catch((err) => {
        return Observable.of(new AlertActions.ShowErrorMessage({message: err.json().message, keepAfterNavigationChange: false}));
    });*/

  @Effect({dispatch: false})
  authLogout = this.actions$
    .ofType(AuthActions.LOGOUT)
    .do(() => {
      this.router.navigate(['/signin']);
      localStorage.removeItem('token');
    });

  @Effect({dispatch: false})
  authSetToken = this.actions$
    .ofType(AuthActions.SET_TOKEN)
    .do((action: AuthActions.SetToken) => {
        localStorage.setItem('token', action.payload);
    })  
}
