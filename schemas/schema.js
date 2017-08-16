'use strict'
var GraphQL = require('graphql');
var CountryType = require('./country');
var AreaType = require('./area');

module.exports = (models) => {
    var schema = new GraphQL.GraphQLSchema({
        query: new GraphQL.GraphQLObjectType({
            name: 'Query',
            description: 'The root of all... queries',
            fields: () => ({
                hello: {
                    type: GraphQL.GraphQLString,
                    resolve: () => { return 'world';}
                    
                },
                country: {
                    type: new GraphQL.GraphQLList(CountryType),
                    args: {
                        id: {
                            type: GraphQL.GraphQLInt
                        }
                    },
                    resolve: (root, args) => {
                        return models.Country.findAll({ where: args});
                    }
                },
                area: {
                    type: new GraphQL.GraphQLList(AreaType),
                    resolve: (root, args) => {
                        return models.Area.findAll({ where: args});
                    }
                }
            })
        }),
    });

    return schema;
}