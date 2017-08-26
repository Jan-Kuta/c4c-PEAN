var Country = require('./country').Type;
var Coordinates = require('./coordinates').Type;

module.exports = (models) => {
    var exp = {};

    exp['Type'] = `
            # Climbing areas
            type Picture{
                id: Int!
                url: String
                alt: String
                createdAt: String
                updatedAt: String
                deletedAt: String
            }

    `;

    exp['QueriesDeclaration'] = `
            # Picture by Id
            picture(id: Int!): Picture
            
    `;

    exp['Queries'] = {
        picture: (root, args) => { return models.Area.findOne({ where: args}); }
    };

    exp['Mutations'] = {};

    exp['Resolver'] = {
                Picture:{
                    createdAt: (area) => {
                        return area.createdAt.toISOString();
                    },
                    updatedAt: (area) => {
                        return area.updatedAt.toISOString();
                    },
                    deletedAt: (area) => {
                        if (area.deletedAt != null){
                            return area.deletedAt.toISOString();
                        } else {
                            return null;
                        }
                    }
                }
            }

    return exp;
}