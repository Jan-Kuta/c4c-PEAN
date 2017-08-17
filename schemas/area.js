var GraphQL = require('graphql');
var Country = require('./country');

var exp = {};

exp['Type'] = `
        # Climbing areas
        type Area{
            id: Int!
            name: String
            country: Country
        }

`;

exp['Resolver'] = {
            Area:{
                name: (area) => (area.areaname),
                country: (area) => { return area.getCountry(); }
            }
        }
module.exports = exp;