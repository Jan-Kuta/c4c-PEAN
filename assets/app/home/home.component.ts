import { AlertService } from './../alert/alert.service';
import { AreaService } from './area.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
const ol: any = require('openlayers');

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild("mapElement") mapElement: ElementRef;

  areas = [];
  public map: any;

  constructor(private areaService: AreaService, private alertService: AlertService) {}
    

  ngOnInit() {
    var osm_layer: any = new ol.layer.Tile({
            source: new ol.source.OSM()
        });

        // note that the target cannot be set here!
        this.map = new ol.Map({
            layers: [osm_layer],
            view: new ol.View({
            center: ol.proj.transform([0,0], 'EPSG:4326', 'EPSG:3857'),
            zoom: 2
            })
        });

        //this.map.on('moveend', this.onMoveEnd);
  }

  ngAfterViewInit(){
    this.map.setTarget(this.mapElement.nativeElement.id);
    this.map.on('click', this.onMoveEnd);
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
          console.log("Got areas: "+areas.length);
          this.areas=areas;
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
