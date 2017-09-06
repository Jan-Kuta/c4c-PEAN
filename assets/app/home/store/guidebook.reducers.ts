import * as GuidebookActions from './guidebook.actions';
import { GQL } from '../../shared/schema/schema'

export interface State {
  rocks: GQL.IRock[];
  parentSector: GQL.ISector;
  selectedRock: GQL.IRock;
  selectedRockIndex: number;
}

const initialState: State = {
  rocks: [],
  parentSector: null,
  selectedRock: null,
  selectedRockIndex: -1
};

export function guidebookReducer(state = initialState, action: GuidebookActions.GuidebookActions) {
  switch (action.type) {
    case GuidebookActions.ADD_ROCK:
      return {
        ...state,
        rocks: [...state.rocks, action.payload]
      };
    case GuidebookActions.SELECT_ROCK:
      return {
        ...state,
        selectedRock: {...action.payload.rock},
        selectedRockIndex: action.payload.index
      };
    default:
      return state;
  }
}
