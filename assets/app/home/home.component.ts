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
  @ViewChild("popupContent") content: ElementRef;
  @ViewChild("popup") popup: ElementRef;

  areas = [];
  vectorSource = new ol.source.Vector({});
  styleCache = {};
  overlay;

  public map: any;

  constructor(private areaService: AreaService, private alertService: AlertService) {}
    

  ngOnInit() {
    this.overlay = new ol.Overlay( ({
        element: this.popup.nativeElement,
        autoPan: true,
        autoPanAnimation: {
          duration: 250
        }
      }));

    var osm_layer: any = new ol.layer.Tile({
            source: new ol.source.OSM()
        });

    // define vector layer for markers (Clustering envolved)
    var vector = new ol.layer.Vector({
      source: new ol.source.Cluster({
        distance: 25,
        source: this.vectorSource
      }),
      // styling of the Cluster
      style: (feature) => {
        var size = feature.get('features').length;
        var style = this.styleCache[size];
        if (!style) {
          style = new ol.style.Style({
            image: new ol.style.Circle({
              radius: size>1?10:5,
              stroke: new ol.style.Stroke({
                color: size>1?'#fff':'black'
              }),
              fill: new ol.style.Fill({
                color: size>1?'#3399CC':'yellow'
              })
            }),
            text: new ol.style.Text({
              text: size>1?size.toString():'',
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
        layers: [osm_layer, vector],
        overlays: [this.overlay],
        view: new ol.View({
        center: ol.proj.transform([0,0], 'EPSG:4326', 'EPSG:3857'),
        zoom: 2
        })
    });

    var select = new ol.interaction.Select({
        condition: ol.events.condition.pointerMove
      });
    this.map.addInteraction(select);
    select.on('select', (e) => {
        this.onFeatureHighlighted(e);
      }
    );

    this.map.addControl(zoomslider);

    // redraw Markers on map moving
    this.map.on('moveend', this.onMoveEnd.bind(this));

  }

  isCluster(feature) {
    if (!feature || !feature.get('features')) { 
          return false; 
    }
    return feature.get('features').length > 1;
  }

  ngAfterViewInit(){
    this.map.setTarget(this.mapElement.nativeElement.id);
  }

  onFeatureHighlighted(event){
    // Show the Popup window on mouseIn and hide it on mouseOut
    if (event.selected.length>0){
      var coordinate = event.mapBrowserEvent.coordinate;
      this.content.nativeElement.innerHTML = '<p>You clicked here:</p>';
      this.overlay.setPosition(coordinate);
    } else{
      this.overlay.setPosition(undefined);
    }
       
  }

  // Close Popup
  onPopupCloser(){
    console.log("closing popup");
    this.overlay.setPosition(undefined);
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
