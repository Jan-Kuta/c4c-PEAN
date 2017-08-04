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
  vectorSource = new ol.source.Vector({});
  styleCache = {};
  public map: any;

  constructor(private areaService: AreaService, private alertService: AlertService) {}
    

  ngOnInit() {
    var osm_layer: any = new ol.layer.Tile({
            source: new ol.source.OSM()
        });

    var vector = new ol.layer.Vector({
      source: new ol.source.Cluster({
        distance: 25,
        source: this.vectorSource
      }),
      style: (feature) => {
        var size = feature.get('features').length;
        var style = this.styleCache[size];
        if (!style) {
          style = new ol.style.Style({
            image: new ol.style.Circle({
              radius: 10,
              stroke: new ol.style.Stroke({
                color: '#fff'
              }),
              fill: new ol.style.Fill({
                color: '#3399CC'
              })
            }),
            text: new ol.style.Text({
              text: size.toString(),
              fill: new ol.style.Fill({
                color: '#fff'
              })
            })
          });
          this.styleCache[size] = style;
        }
        return style;
      }
    });

    // note that the target cannot be set here!
    var zoomslider = new ol.control.ZoomSlider();
    this.map = new ol.Map({
        /*controls: ol.control.zoom,*/
        layers: [osm_layer, vector],
        view: new ol.View({
        center: ol.proj.transform([0,0], 'EPSG:4326', 'EPSG:3857'),
        zoom: 2
        })
    });

    this.map.addControl(zoomslider);

    this.map.on('moveend', this.onMoveEnd.bind(this));

  }

  ngAfterViewInit(){
    this.map.setTarget(this.mapElement.nativeElement.id);
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
          this.getFeatures(areas);
        },
        (error) => {
          console.log(error);
          this.alertService.error(error);
        }
    )
  }

  getFeatures(areas){
    this.vectorSource.clear();

    areas.forEach(area => {
      console.log("Pushing: ", area.location.coordinates);
      var point = new ol.geom.Point(area.location.coordinates)
      point.transform('EPSG:4326', 'EPSG:900913');
      this.vectorSource.addFeature(new ol.Feature(point));
    }, this);
  }

  onMouseOver(event){
    console.log("OVER");
  }

}
