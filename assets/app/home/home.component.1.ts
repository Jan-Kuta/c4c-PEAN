import { AlertService } from './../alert/alert.service';
import { AreaService } from './area.service';
import { Component, OnInit} from '@angular/core';
const ol: any = require('openlayers');

@Component({
  selector: 'app-home-declarative',
  templateUrl: './home.component.1.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponentDeclarative implements OnInit{
  areas = [];
  
  constructor(private areaService: AreaService, private alertService: AlertService) {}

  ngOnInit() {
    
  }

  // refresh areas when map moved
  onMoveEnd(event){
    // get window coordinates
    var coords = event.map.getView().calculateExtent(event.map.getSize());
    coords = ol.proj.transformExtent(coords, 'EPSG:3857', 'EPSG:4326');
    console.log("Window coordinates: ", coords);
    this.alertService.success("MovingEnd ["+coords[0]+","+coords[3]+"],["+coords[2]+","+coords[1]+"]");

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
          this.alertService.error(error);
        }
    )
  }

  onMouseOver(event){
    console.log("OVER");
  }

}
