'use strict'
var _ = require('lodash');
var GraphQLTools = require('graphql-tools');
var Country = require('./country').Type;
var CountryResolver = require('./country').Resolver;
var Area = require('./area').Type;
var AreaResolver= require('./area').Resolver;

module.exports = (models) => {

    const RootQuery = `
        # Queries
        type Query {
            # Countries of the world
            countries(id: Int): [Country]
            # Climbing areas
            areas(id: Int): [Area]
        }
        `;
        const SchemaDefinition = `
        schema {
            query: Query
        }
        `;

    const rootResolvers = {
        Query: {
            countries: (root, args) => { return models.Country.findAll({ where: args}); },
            areas: (root, args) => { return models.Area.findAll({ where: args}); }
        }
    };

    const resolvers = _.merge(rootResolvers, CountryResolver, AreaResolver);
    
    var schema = GraphQLTools.makeExecutableSchema({
        typeDefs: [SchemaDefinition, RootQuery]
                        .concat(Country)
                        .concat(Area),
        resolvers
    });

    return schema;
}