'use strict'
var GraphQLTools = require('graphql-tools');

module.exports = (models) => {
    
    const typeDefs = `
        type Country{
            id: Int!
            name: String
            areas: [Area]
        }
        
        type Area{
            id: Int!
            name: String
            country: Country
        }

        type Query{
            countries: [Country]
            # country(id: Int!): Country
            areas: [Area]
            # area(id: Int!): Area
        }
    `;
    const resolvers = {
        Query: {
            countries: (root, args) => { return models.Country.findAll({ where: args}); },
            areas: (root, args) => { return models.Area.findAll({ where: args}); }
        },
        Country: {
            name: (country) => (country.countryname),
            areas: (country) => { return country.getAreas(); }
        },
        Area:{
            name: (area) => (area.areaname),
            country: (area) => { return area.getCountry(); }
        }
    };
    
    var schema = GraphQLTools.makeExecutableSchema({
        typeDefs,
        resolvers
    });

    return schema;
}