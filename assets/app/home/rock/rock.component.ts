import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

import * as fromApp from '../../store/app.reducers';
import * as GuidebookActions from '../store/guidebook.actions';

@Component({
  selector: 'app-rock',
  templateUrl: './rock.component.html'
})
export class RockComponent implements OnInit{

  constructor ( private store: Store<fromApp.AppState> ){}
  
  ngOnInit(){
    this.store.dispatch(new GuidebookActions.TrySelectRock(2));
  }

}