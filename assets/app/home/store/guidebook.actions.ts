import { GQL } from './../../shared/schema/schema';
import { Action } from '@ngrx/store';

export const ADD_ROCK = 'ADD_ROCK';
export const TRY_SELECT_ROCK = 'TRY_SELECT_ROCK';
export const SELECT_ROCK = 'SELECT_ROCK';

export class AddRock implements Action {
  readonly type = ADD_ROCK;

  constructor(public payload: GQL.IRock) {}
}

export class TrySelectRock implements Action {
  readonly type = TRY_SELECT_ROCK;

  constructor(public payload: number) {}
}

export class SelectRock implements Action {
  readonly type = SELECT_ROCK;

  constructor(public payload: {index: number, rock: GQL.IRock}) {}
}

export type GuidebookActions = AddRock | TrySelectRock | SelectRock;
