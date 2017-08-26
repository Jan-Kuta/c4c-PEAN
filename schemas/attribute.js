var Country = require('./country').Type;
var Coordinates = require('./coordinates').Type;

module.exports = (models) => {
    var exp = {};

    exp['Type'] = `
            # Climbing areas
            type Attribute{
                id: Int!
                name: String
                picture: Picture
                createdAt: String
                updatedAt: String
                deletedAt: String
            }

    `;

    exp['QueriesDeclaration'] = `
            # Climbing areas
            attributes(id: Int): [Attribute]
            
    `;

    exp['Queries'] = {
        attributes: (root, args) => { return models.Attribute.findAll({ where: args}); }
    };

    exp['Mutations'] = {};

    exp['Resolver'] = {
                Attribute:{
                    name: (attribute) => (attribute.attributename),
                    createdAt: (attribute) => {
                        return attribute.createdAt.toISOString();
                    },
                    updatedAt: (attribute) => {
                        return attribute.updatedAt.toISOString();
                    },
                    deletedAt: (attribute) => {
                        if (attribute.deletedAt != null){
                            return attribute.deletedAt.toISOString();
                        } else {
                            return null;
                        }
                    },
                    picture: (attribute) => (attribute.getAttributePicture())
                }
            }

    return exp;
}