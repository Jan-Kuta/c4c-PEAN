var Area = require('./area').Type;

var exp = {};

exp['Type'] = `
        # Countries of the world
        type Country{
            id: Int!
            name: String
            areas: [Area]
        }
        `;

exp['Resolver']= {
            Country: {
                name: (country) => (country.countryname),
                areas: (country) => { return country.getAreas(); }
            }
        };

module.exports = exp;