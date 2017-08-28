import { Action } from '@ngrx/store';

export const SHOW_SUCCESS_MESSAGE = 'SHOW_SUCCESS_MESSAGE';
export const SHOW_ERROR_MESSAGE = 'SHOW_ERROR_MESSAGE';
export const CLEAR_MESSAGE = 'CLEAR_MESSAGE';
export const NAVIGATION_CHANGED = 'NAVIGATION_CHANGED';

export class ShowSuccessMessage implements Action {
  readonly type = SHOW_SUCCESS_MESSAGE;

  constructor(public payload: { message:String, keepAfterNavigationChange: Boolean }) {}
}

export class ShowErrorMessage implements Action {
  readonly type = SHOW_ERROR_MESSAGE;

  constructor(public payload: { message:String, keepAfterNavigationChange: Boolean }) {}
}

export class ClearMessage implements Action {
  readonly type = CLEAR_MESSAGE;
}

export class NavigationChanged implements Action {
  readonly type = NAVIGATION_CHANGED;
}

export type AlertActions = 
        ShowSuccessMessage |
        ShowErrorMessage |
        ClearMessage |
        NavigationChanged;