import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducers';
import * as AuthActions from '../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit{
  authState: Observable<fromAuth.State>;
  
  constructor(private router: Router, private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }

}
