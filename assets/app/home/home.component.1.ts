import { Store } from '@ngrx/store';
import { AreaService } from './area.service';
import { Component, OnInit} from '@angular/core';

import * as fromApp from '../store/app.reducers';
import * as AlertActions from '../alert/store/alert.actions';

const ol: any = require('openlayers');

@Component({
  selector: 'app-home-declarative',
  templateUrl: './home.component.1.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponentDeclarative implements OnInit{
  areas = [];
  
  constructor(private areaService: AreaService, private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    
  }

  // refresh areas when map moved
  onMoveEnd(event){
    // get window coordinates
    var coords = event.map.getView().calculateExtent(event.map.getSize());
    coords = ol.proj.transformExtent(coords, 'EPSG:3857', 'EPSG:4326');
    console.log("Window coordinates: ", coords);
    this.store.dispatch(new AlertActions.ShowSuccessMessage({message: "MovingEnd ["+coords[0]+","+coords[3]+"],["+coords[2]+","+coords[1]+"]", keepAfterNavigationChange: false}));
    
    // get Areas in this coordinates
    this.areaService.getAreaByLocation(coords[0], coords[3], coords[2], coords[1]).subscribe(
      (areas: any) => {
          console.log("Got areas: "+areas.length, areas);
          this.areas=areas;
          // var count = 20000;
          // var e = 90;
          // var areas2 = [];
          // for (var i = 0; i < count; ++i) {
          //   var coordinates = [2 * e * Math.random() - e, 2 * e * Math.random() - e];
          //   areas2.push( {areaname: 'Loc'+i ,location: { type: "Point", coordinates: coordinates}});
          // }
          // console.log(areas2.length);
          // this.areas = this.areas.concat(...areas2);
          // console.log("Got areas: "+this.areas.length);
        },
        (error) => {
          console.log(error);
          this.store.dispatch(new AlertActions.ShowErrorMessage({message: error, keepAfterNavigationChange: false}));
        }
    )
  }

  onMouseOver(event){
    console.log("OVER");
  }

}
