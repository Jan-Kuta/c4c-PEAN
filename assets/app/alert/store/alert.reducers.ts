import * as AlertActions from './alert.actions';

export interface State {
  message: String;
  type: String;
  keepAfterNavigationChange: Boolean;
}

const initialState: State = {
  message: null,
  type: null,
  keepAfterNavigationChange: false
};

export function alertReducer(state = initialState, action: AlertActions.AlertActions){

    switch (action.type){
        case AlertActions.SHOW_SUCCESS_MESSAGE:
            return {
                ...state,
                type: 'success',
                message: action.payload.message,
                keepAfterNavigationChange: action.payload.keepAfterNavigationChange
            };
        case AlertActions.SHOW_ERROR_MESSAGE:
            return {
                ...state,
                type: 'error',
                message: action.payload.message,
                keepAfterNavigationChange: action.payload.keepAfterNavigationChange
            };
        case AlertActions.CLEAR_MESSAGE:
            return {
                ...state,
                message: ''
            };
        case AlertActions.NAVIGATION_CHANGED:
            return {
                ...state,
                message: state.keepAfterNavigationChange? state.message : '',
                keepAfterNavigationChange: false  // only keep for a single location change
            };
        default:
            return state;
    }

}