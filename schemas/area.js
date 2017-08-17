var Country = require('./country').Type;
var Coordinates = require('./coordinates').Type;

var exp = {};

exp['Type'] = `
        # Climbing areas
        type Area{
            id: Int!
            name: String
            coordinates: Coordinates
            country: Country
        }

`;

exp['Resolver'] = {
            Area:{
                name: (area) => (area.areaname),
                coordinates: (area) => {
                    return { lat: area.location.coordinates[1], lng: area.location.coordinates[0] };
                },
                country: (area) => { return area.getCountry(); }
            }
        }

module.exports = exp;