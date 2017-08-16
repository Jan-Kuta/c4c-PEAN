var GraphQL = require('graphql');
var CountryType = require('./country');

const AreaType = new GraphQL.GraphQLObjectType({
  name: 'Area',
  description: 'Climbing Areas',
  fields: () => ({
    id: {
        type: GraphQL.GraphQLInt,
        resolve: (area) => (area.id)
    },
    name: {
        type: GraphQL.GraphQLString,
        resolve: (area) => (area.areaname)
    }/*,
    country: {
        type: CountryType,
        resolve: (area) => {
            return area.getCountry();
        }
    }*/
  })
});

module.exports = AreaType;