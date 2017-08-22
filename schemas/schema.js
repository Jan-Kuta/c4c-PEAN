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

    const rootResolvers = {
        Query: {
            countries: (root, args) => { return models.Country.findAll({ where: args}); },
            areas: (root, args) => { return models.Area.findAll({ where: args}); },
            user: (root, args) => { return models.User.find({ where: args}); }
        }/*,
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
                        AreaResolver
                    );
    
    var schema = GraphQLTools.makeExecutableSchema({
        typeDefs: [SchemaDefinition, RootQuery/*, RootMutation*/]
                        .concat(User)
                        .concat(Country)
                        .concat(Area)
                        .concat(Coordinates),
        resolvers
    });

    return schema;
}