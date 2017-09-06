import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { GQL } from '../shared/schema/schema';

interface QueryResponse{
  areas: GQL.IArea[]
  loading
}

@Injectable()
export class AreaService {
    constructor(private http: Http, private apollo: Apollo){}

    getAreaByCountry(countryId: number){
        return this.http.get("api/area/bycountry/"+countryId)
            .map((res:Response) => res.json())
            /*.catch((error:any) => Observable.throw('Did not get areas, server problem occured.'))*/;
    }

    getAreaByLocation(lngLeftUp: number, latLeftUp: number, lngRightDown: number, latRightDown: number){
        return this.http.get("api/area/bylocation/"+lngLeftUp+"/"+latLeftUp+"/"+lngRightDown+"/"+latRightDown)
            .map((res: Response) => res.json())
            /*.catch((error:any) => Observable.throw('Did not get areas, server problem occured.'))*/;
    }

    getAllAreas(){
        const allAreas = gql`
            query {
                areas {
                    id,
                    name,
                    coordinates {
                        lat
                        lng
                    }
                }
            }`;

        return this.apollo.watchQuery<QueryResponse>({
            query: allAreas
        });
    }
}