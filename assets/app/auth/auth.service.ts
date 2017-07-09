import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import "rxjs/Rx";

@Injectable()
export class AuthService {
  token: string;

  constructor(private router: Router, private http: Http) {
    this.token = localStorage.getItem('token');
  }

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
        return data;
      })
      .catch(
        (error: Response) => {
          return Observable.throw('Bad credentials');
        }
      );
  }

  logout() {
    this.token = null;
    localStorage.clear();
  }

  getToken() {
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }
}
