import { Http, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import "rxjs/Rx";

@Injectable()
export class AuthService {
  token: string;

  constructor(private http: Http) {
    this.token = localStorage.getItem('token');
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

  // login by facebook account
  facebookLogin(){
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.get(
      '/api/user/auth/facebook', 
      {headers: headers});
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
