import { State } from './../alert/store/alert.reducers';
import {ActionReducerMap} from '@ngrx/store';

import * as fromAlert from '../alert/store/alert.reducers';
import * as fromAuth from '../auth/store/auth.reducers';
import * as fromGuidebook from '../home/store/guidebook.reducers';

export interface AppState {
    alert: fromAlert.State,
    auth: fromAuth.State,
    guidebook: fromGuidebook.State
}

export const reducers: ActionReducerMap<AppState> = {
  alert: fromAlert.alertReducer,
  auth: fromAuth.authReducer,
  guidebook: fromGuidebook.guidebookReducer
};
