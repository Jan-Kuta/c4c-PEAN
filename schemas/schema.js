'use strict'

module.exports = (models) => {

    var _ = require('lodash');
    var GraphQLTools = require('graphql-tools');
    
    var UserBundle = require('./user')(models);
    var User = UserBundle.Type;
    var UserResolver = UserBundle.Resolver;
    var UserQueries = UserBundle.Queries;
    var UserQueriesDeclaration = UserBundle.QueriesDeclaration;
    
    var CountryBundle = require('./country')(models);
    var Country = CountryBundle.Type;
    var CountryResolver = CountryBundle.Resolver;
    var CountryQueries = CountryBundle.Queries;
    var CountryQueriesDeclaration = CountryBundle.QueriesDeclaration;
    
    var AreaBundle = require('./area')(models);
    var Area = AreaBundle.Type;
    var AreaResolver = AreaBundle.Resolver;
    var AreaQueries = AreaBundle.Queries;
    var AreaQueriesDeclaration = AreaBundle.QueriesDeclaration;
    
    var SectorBundle = require('./sector')(models);
    var Sector = SectorBundle.Type;
    var SectorResolver = SectorBundle.Resolver;
    var SectorQueries = SectorBundle.Queries;
    var SectorQueriesDeclaration = SectorBundle.QueriesDeclaration;
    
    var RockBundle = require('./rock')(models);
    var Rock = RockBundle.Type;
    var RockResolver = RockBundle.Resolver;
    var RockQueries = RockBundle.Queries;
    var RockQueriesDeclaration = RockBundle.QueriesDeclaration;
    
    var RouteBundle = require('./route')(models);
    var Route = RouteBundle.Type;
    var RouteResolver = RouteBundle.Resolver;
    var RouteQueries = RouteBundle.Queries;
    var RouteQueriesDeclaration = RouteBundle.QueriesDeclaration;
    
    var AttributeBundle = require('./attribute')(models);
    var Attribute = AttributeBundle.Type;
    var AttributeResolver = AttributeBundle.Resolver;
    var AttributeQueries = AttributeBundle.Queries;
    var AttributeQueriesDeclaration = AttributeBundle.QueriesDeclaration;
    
    var PictureBundle = require('./picture')(models);
    var Picture = PictureBundle.Type;
    var PictureResolver = PictureBundle.Resolver;
    var PictureQueries = PictureBundle.Queries;
    var PictureQueriesDeclaration = PictureBundle.QueriesDeclaration;
    
    var Coordinates = require('./coordinates').Type;

    const RootQuery = `
        # Queries
        type Query {
            ${CountryQueriesDeclaration}
            ${AreaQueriesDeclaration}
            ${SectorQueriesDeclaration}
            ${RockQueriesDeclaration}
            ${RouteQueriesDeclaration}
            ${UserQueriesDeclaration}
            ${AttributeQueriesDeclaration}
            ${PictureQueriesDeclaration}
        }
        `;

    /*const RootMutation = `
        # Mutations
        type Mutation {
            # register new User
            register(
                username: String!
                email: String!
                password: String!
            ): User

            # verify e-mail address of the user
            verify(
                token: String!
            ): String

            # login existing user
            login(
                email: String!
                password: String!
            ): String
        }
    `;*/

    const SchemaDefinition = `
        schema {
            query: Query
            #mutation: Mutation
        }
        `;

    const Queries = Object.assign(
        UserQueries,
        CountryQueries,
        AreaQueries,
        SectorQueries,
        RockQueries,
        RouteQueries,
        AttributeQueries,
        PictureQueries
    );

    const rootResolvers = {
        Query: Queries/*,
        Mutation:{
            register: (_, {username, email, password}) => {
                var user = models.User.build({
                    username: username,
                    email: email
                });
                user.setPassword(password);
                return user.save().then(usr => {
                        console.log('User saved ', usr.dataValues);
                        return usr.dataValues;
                    })
                    .catch((error) => {
                        console.log('Error: ', error);
                        throw(error.errors[0].message);
                    })
                
            },
            verify: (_, {}) => {
                console.log('Verifying email address');
            },
            login: (_, {email, password}) => {
                console.log("Loging in user: " + email);
                return "token";
            }
        }*/
    };

    const resolvers = _.merge(
                        rootResolvers, 
                        UserResolver,
                        CountryResolver, 
                        AreaResolver,
                        SectorResolver,
                        RockResolver,
                        RouteResolver,
                        AttributeResolver,
                        PictureResolver
                    );
    
    var schema = GraphQLTools.makeExecutableSchema({
        typeDefs: [SchemaDefinition, RootQuery/*, RootMutation*/]
                        .concat(User)
                        .concat(Country)
                        .concat(Area)
                        .concat(Sector)
                        .concat(Rock)
                        .concat(Route)
                        .concat(Attribute)
                        .concat(Picture)
                        .concat(Coordinates),
        resolvers
    });

    return schema;
}