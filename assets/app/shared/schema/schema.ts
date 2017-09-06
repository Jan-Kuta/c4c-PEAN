// tslint:disable
// graphql typescript definitions

export namespace GQL {
  export interface IGraphQLResponseRoot {
    data?: IQuery;
    errors?: Array<IGraphQLResponseError>;
  }

  export interface IGraphQLResponseError {
    message: string;            // Required for all errors
    locations?: Array<IGraphQLResponseErrorLocation>;
    [propName: string]: any;    // 7.2.2 says 'GraphQL servers may provide additional entries to error'
  }

  export interface IGraphQLResponseErrorLocation {
    line: number;
    column: number;
  }

  /*
    description: Queries
  */
  export interface IQuery {
    __typename: "Query";
    countries: Array<ICountry> | null;
    areas: Array<IArea> | null;
    sectors: Array<ISector> | null;
    rocks: Array<IRock> | null;
    routes: Array<IRoute> | null;
    user: IUser | null;
    attributes: Array<IAttribute> | null;
    picture: IPicture | null;
  }

  /*
    description: Countries of the world
  */
  export interface ICountry {
    __typename: "Country";
    id: number;
    name: string | null;
    areas: Array<IArea> | null;
  }

  /*
    description: Climbing areas
  */
  export interface IArea {
    __typename: "Area";
    id: number;
    name: string | null;
    coordinates: ICoordinates | null;
    createdAt: string | null;
    updatedAt: string | null;
    deletedAt: string | null;
    country: ICountry | null;
    sectors: Array<ISector> | null;
  }

  /*
    description: Coordinate (longitude, latitude)
  */
  export interface ICoordinates {
    __typename: "Coordinates";
    lat: number | null;
    lng: number | null;
  }

  /*
    description: Climbing Sectors
  */
  export interface ISector {
    __typename: "Sector";
    id: number;
    name: string | null;
    coordinates: ICoordinates | null;
    createdAt: string | null;
    updatedAt: string | null;
    deletedAt: string | null;
    area: IArea | null;
    rocks: Array<IRock> | null;
  }

  /*
    description: Climbing Rocks
  */
  export interface IRock {
    __typename: "Rock";
    id: number;
    name: string | null;
    coordinates: ICoordinates | null;
    createdAt: string | null;
    updatedAt: string | null;
    deletedAt: string | null;
    sector: ISector | null;
    routes: Array<IRoute> | null;
  }

  /*
    description: Climbing Routes
  */
  export interface IRoute {
    __typename: "Route";
    id: number;
    name: string | null;
    createdAt: string | null;
    updatedAt: string | null;
    deletedAt: string | null;
    rock: IRock | null;
  }

  /*
    description: Users of our system
  */
  export interface IUser {
    __typename: "User";
    id: number;
    name: string | null;
    email: string | null;
    createdAt: string | null;
    updatedAt: string | null;
    deletedAt: string | null;
  }

  /*
    description: Climbing areas
  */
  export interface IAttribute {
    __typename: "Attribute";
    id: number;
    name: string | null;
    picture: IPicture | null;
    createdAt: string | null;
    updatedAt: string | null;
    deletedAt: string | null;
  }

  /*
    description: Climbing areas
  */
  export interface IPicture {
    __typename: "Picture";
    id: number;
    url: string | null;
    alt: string | null;
    createdAt: string | null;
    updatedAt: string | null;
    deletedAt: string | null;
  }
}

// tslint:enable

