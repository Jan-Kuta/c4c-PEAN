import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import "rxjs/Rx";
@Injectable()
export class AuthService {
  token: string;

  constructor(private router: Router, private http: Http) {}

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
        return response.json();
      });
  }

  signinUser(email: string, password: string) {
    
  }

  logout() {
    this.token = null;
  }

  getToken() {
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }
}
