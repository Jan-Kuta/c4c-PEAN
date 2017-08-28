import {ActionReducerMap} from '@ngrx/store';
import * as fromAlert from '../alert/store/alert.reducers'

export interface AppState {
    alert: fromAlert.State
}

export const reducers: ActionReducerMap<AppState> = {
  alert: fromAlert.alertReducer
};
