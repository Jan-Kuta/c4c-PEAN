import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import gql from 'graphql-tag';
import { GQL } from './../../shared/schema/schema';

import * as GuidebookActions  from './guidebook.actions';

interface QueryResponse{
  rocks: GQL.IRock[]
  loading
}

@Injectable()
export class GuidebookEffects {

    constructor(public actions$: Actions, private apollo: Apollo){}

    @Effect()
    guidebookSelectRock$: Observable<Action> = this.actions$
        .ofType(GuidebookActions.TRY_SELECT_ROCK)
        .map((action: GuidebookActions.TrySelectRock) => {
            return action.payload;
        })
        .switchMap((id: number) => {
            const rockById = gql`
                query rockById($id: Int){
                    rocks(id: $id){
                        id
                        name
                        coordinates{
                            lat
                            lng
                        }
                        routes{
                            id
                            name
                        }
                    }
                }
            `;
            return this.apollo.watchQuery<QueryResponse>({
                query: rockById, variables:{ id: id }
            });
        })
        .do(console.log)
        .map((resp: ApolloQueryResult<QueryResponse>)=> resp.data)
        .map((data: QueryResponse) => {
            return new GuidebookActions.SelectRock({index: data.rocks[0].id, rock: data.rocks[0]});
        });
}