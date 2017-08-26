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
    
    var Coordinates = require('./coordinates').Type;

    const RootQuery = `
        # Queries
        type Query {
            ${CountryQueriesDeclaration}
            ${AreaQueriesDeclaration}
            ${UserQueriesDeclaration}
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
        AreaQueries
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