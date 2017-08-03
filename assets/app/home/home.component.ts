import { AlertService } from './../alert/alert.service';
import { AreaService } from './area.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  areas = [];

  constructor(private areaService: AreaService, private alertService: AlertService) { }

  ngOnInit() {
    this.areaService.getAreaByCountry(1).subscribe(
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
