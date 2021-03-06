import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AreaService {
    constructor(private http: Http){}

    getAreaByCountry(countryId: number){
        return this.http.get("api/area/bycountry/"+countryId)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw('Did not get areas, server problem occured.'));
    }

    getAreaByLocation(lngLeftUp: number, latLeftUp: number, lngRightDown: number, latRightDown: number){
        return this.http.get("api/area/bylocation/"+lngLeftUp+"/"+latLeftUp+"/"+lngRightDown+"/"+latRightDown)
            .map((res: Response) => res.json())
            .catch((error:any) => Observable.throw('Did not get areas, server problem occured.'));
    }
}