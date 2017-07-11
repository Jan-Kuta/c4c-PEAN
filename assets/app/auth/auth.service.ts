import { Http, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import "rxjs/Rx";
const Hello: any = require('hellojs');

@Injectable()
export class AuthService {
  token: string;

  constructor(private http: Http) {
    this.token = localStorage.getItem('token');

    Hello.init({
        facebook: '1162399500488752',
        twitter: 'Z5NdGpWqQ9cbZCucoDxSj4Myy',
        google: '49164558893-c736h9vt0ge4o2u6b2ieabv5kdats72r.apps.googleusercontent.com'
    });

    Hello.on('auth.login', function(auth) {
        // Call user information, for the given network
        console.log('auth: ', auth);
        Hello(auth.network).api('me').then(function(r) {
            console.log(auth);
            console.log(r);
        });
    });
  }

  // facebook login
  loginFacebook() {
      Hello('facebook').login();
  }

  // twitter login
  loginTwitter() {
      Hello('twitter').login();
  }

  // google login
  loginGoogle() {
      Hello('google').login();
  }

  // User registration
  signupUser(username: string, email: string, password: string) {
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(
      '/api/user/register', 
      {
        "username": username,
        "email": email,
        "password": password
      }, 
      {headers: headers})
      .map((response: Response) =>{
        const data = response.json();
        this.token = data.token;
        return data;
      })
      .catch(
        (error: Response) => {
          return Observable.throw('User with this email already exists');
        }
      );
  }

  // login user
  signinUser(email: string, password: string) {
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(
      '/api/user/login', 
      {
        "email": email,
        "password": password
      }, 
      {headers: headers})
      .map((response: Response) =>{
        const data = response.json();
        this.token = data.token;
        localStorage.setItem('token', this.token);
        return data;
      })
      .catch(
        (error: Response) => {
          return Observable.throw('Bad credentials');
        }
      );
  }

  // logout user
  logout() {
    this.token = null;
    localStorage.clear();
  }

  // get Token
  getToken() {
    return this.token;
  }

  // Check if user is authenticated
  isAuthenticated() {
    return this.token != null;
  }
}
