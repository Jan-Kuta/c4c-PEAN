import { AlertService } from './../alert/alert.service';
import { AreaService } from './area.service';
import { Component, OnInit } from '@angular/core';
const ol: any = require('openlayers');

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  areas = [];

  constructor(private areaService: AreaService, private alertService: AlertService) { }

  ngOnInit() {
  }

  onMoveEnd(event){
    var result = event.map.getView().calculateExtent(event.map.getSize());
    result = ol.proj.transformExtent(result, 'EPSG:3857', 'EPSG:4326');
    console.log("RESULT", result);
    this.alertService.success("MovingEnd ["+result[0]+","+result[3]+"],["+result[2]+","+result[1]+"]");

    this.areaService.getAreaByLocation(result[0], result[3], result[2], result[1]).subscribe(
      (areas: any) => {
          console.log("Got areas: "+areas.length);
          this.areas=areas;
        },
        (error) => {
          console.log(error);
          this.alertService.error(error);
        }
    )
  }

}
