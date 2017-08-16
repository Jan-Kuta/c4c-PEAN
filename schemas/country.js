var GraphQL = require('graphql');
var AreaType = require('./area');

const CountryType = new GraphQL.GraphQLObjectType({
  name: 'Country',
  description: 'Countries of the world',
  fields: () => ({
    id: {
        type: GraphQL.GraphQLInt,
        resolve: (country) => (country.id)
    },
    name: {
        type: GraphQL.GraphQLString,
        resolve: (country) => (country.countryname)
    },
    areas: {
        type: new GraphQL.GraphQLList(AreaType),
        resolve (country) {
            return country.getAreas();
        }
    }
  })
});

module.exports = CountryType;