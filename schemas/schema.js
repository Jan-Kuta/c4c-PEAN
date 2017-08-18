'use strict'
var _ = require('lodash');
var GraphQLTools = require('graphql-tools');
var User = require('./user').Type;
var UserResolver = require('./user').Resolver;
var Country = require('./country').Type;
var CountryResolver = require('./country').Resolver;
var Area = require('./area').Type;
var AreaResolver = require('./area').Resolver;
var Coordinates = require('./coordinates').Type;

module.exports = (models) => {

    const RootQuery = `
        # Queries
        type Query {
            # Countries of the world
            countries(id: Int): [Country]
            # Climbing areas
            areas(id: Int, CountryId: Int): [Area]
            # get user
            user(id: Int!): User
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
            areas: (root, args) => { return models.Area.findAll({ where: args}); },
            user: (root, args) => { return models.User.find({ where: args}); }
        }
    };

    const resolvers = _.merge(
                        rootResolvers, 
                        UserResolver,
                        CountryResolver, 
                        AreaResolver
                    );
    
    var schema = GraphQLTools.makeExecutableSchema({
        typeDefs: [SchemaDefinition, RootQuery]
                        .concat(User)
                        .concat(Country)
                        .concat(Area)
                        .concat(Coordinates),
        resolvers
    });

    return schema;
}