import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';
import 'rxjs/add/operator/do';

import * as fromApp from '../../store/app.reducers';
import * as AlertActions from './alert.actions';

@Injectable()
export class AlertEffects {
   
    constructor(private actions$: Actions, private store: Store<fromApp.AppState>) {}

    @Effect({dispatch: false})
    alertChangeRoute = this.actions$
        .ofType(ROUTER_NAVIGATION)
        .do(() => {
            this.store.dispatch(new AlertActions.NavigationChanged());
            console.log('Navigations')
        });

}