var Country = require('./country').Type;
var Coordinates = require('./coordinates').Type;

var exp = {};

exp['Type'] = `
        # Climbing areas
        type Area{
            id: Int!
            name: String
            coordinates: Coordinates
            createdAt: String
            updatedAt: String
            deletedAt: String
            country: Country
        }

`;

exp['Resolver'] = {
            Area:{
                name: (area) => (area.areaname),
                coordinates: (area) => {
                    return { lat: area.location.coordinates[1], lng: area.location.coordinates[0] };
                },
                createdAt: (area) => {
                    return area.createdAt.toISOString();
                },
                updatedAt: (area) => {
                    return area.updatedAt.toISOString();
                },
                deletedAt: (area) => {
                    if (area.deletedAt != null){
                        return area.deletedAt.toISOString();
                    } else {
                        return null;
                    }
                },
                country: (area) => { return area.getCountry(); }
            }
        }

module.exports = exp;