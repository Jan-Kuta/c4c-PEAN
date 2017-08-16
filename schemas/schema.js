var GraphQL = require('graphql');

var schema = new GraphQL.GraphQLSchema({
  query: new GraphQL.GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      hello: {
        type: GraphQL.GraphQLString,
        resolve() {
          return 'world';
        }
      }
    }
  })
});

module.exports = schema;