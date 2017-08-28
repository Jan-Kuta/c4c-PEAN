import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import * as fromApp from '../store/app.reducers';
import * as fromAlert from './store/alert.reducers';
import * as AlertActions from './store/alert.actions';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html'
})
export class AlertComponent implements OnInit {
    alertState: Observable<fromAlert.State>;

    private message: any;
    private subscription: Subscription;

    constructor(private store: Store<fromApp.AppState>) { }

    ngOnInit() {
        this.alertState = this.store.select('alert');
    }

    hide() {
        this.store.dispatch(new AlertActions.ClearMessage());
    }
}
