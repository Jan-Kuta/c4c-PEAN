import { Store } from '@ngrx/store';
import { ChartComponent } from './chart.component';
import { AreaService } from './area.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import * as fromApp from '../store/app.reducers';
import * as AlertActions from '../alert/store/alert.actions';

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
  overlay; // popup overlay
  select; // interaction - select

  public map: any;

  constructor(private areaService: AreaService, private store: Store<fromApp.AppState>) {}
    

  ngOnInit() {

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
              radius: size>1?12:5,
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
        view: new ol.View({
        center: ol.proj.transform([0,0], 'EPSG:4326', 'EPSG:3857'),
        zoom: 2
        })
    });

    this.select = new ol.interaction.Select(/*{
        condition: ol.events.condition.pointerMove
      }*/);
    this.map.addInteraction(this.select);
    this.select.on('select', (e) => {
        this.onFeatureHighlighted(e);
      }
    );

    this.map.addControl(zoomslider);

    // add Markers to the map
    this.populateFeatures();

  }

  isCluster(feature) {
    if (!feature || !feature.get('features')) { 
          return false; 
    }
    return feature.get('features').length > 1;
  }

  ngAfterViewInit(){
    this.map.setTarget(this.mapElement.nativeElement.id);
    this.overlay = new ol.Overlay( ({
        element: this.popup.nativeElement,
        autoPan: true,
        //position: [0,0],
        autoPanAnimation: {
          duration: 250
        }
      }));

    this.map.addOverlay(this.overlay);
  }

  onFeatureHighlighted(event){
    // Show the Popup window on click on single feature, ZoomIn on click on cluster
    if (event.selected.length>0){
      var coordinate = event.mapBrowserEvent.coordinate;
      console.log(event.mapBrowserEvent.pixel);
      this.map.forEachFeatureAtPixel(event.mapBrowserEvent.pixel, (feature, layer) => {
        if (typeof feature.get('features') !== 'undefined') { // is cluster
          var clustFeats = feature.get('features');
          if (clustFeats.length > 1){
            // it is cluster -> Zoom In
            this.onPopupCloser();
            this.map.getView().setCenter(coordinate);
            this.map.getView().setZoom(this.map.getView().getZoom()+3);
            console.log("ZoomIn");
          } else {
            // it is a feature -> Show area info 
            console.log("FEATURE: ",clustFeats[0]);
            var feature = event.target.getFeatures();
            //this.content.nativeElement.innerHTML = '<app-chart></app-chart>';//clustFeats[0]["data"]["name"];
            this.overlay.setPosition(coordinate);
          }
        }
      });
    } else{
      this.onPopupCloser();
    }
       
  }

  // Close Popup
  onPopupCloser(){
    console.log("closing popup");
    this.overlay.setPosition(undefined);
    this.select.getFeatures().clear();
  }

  // refresh areas when map moved
  populateFeatures(){
    // get Areas in this coordinates
    this.areaService.getAllAreas().subscribe(
      ({data}) => {
          console.log("Got areas: "+data.areas.length);
          this.areas=data.areas;
          this.getFeatures(data.areas);
        },
        (error) => {
          console.log(error);
          this.store.dispatch(new AlertActions.ShowErrorMessage({message: error, keepAfterNavigationChange: false}));
        }
    )
  }

  // add features to the vector
  getFeatures(areas){
    this.vectorSource.clear();

    areas.forEach(area => {
      console.log("Pushing: ", area.coordinates);
      var point = new ol.geom.Point([area.coordinates.lng, area.coordinates.lat])
      point.transform('EPSG:4326', 'EPSG:900913');

      var feature = new ol.Feature(point);
      feature.data = {name: area.name};
      this.vectorSource.addFeature(feature);
    }, this);

    /*var count = 2000;
    var e = 4500000;
      for (var i = 0; i < count; ++i) {
        var coordinates = [2 * e * Math.random() - e, 2 * e * Math.random() - e];
        this.vectorSource.addFeature( new ol.Feature(new ol.geom.Point(coordinates)));
      }
*/
  }

  onMouseOver(event){
    console.log("OVER");
  }

}
