module.exports = (models) => {
    var exp = {};

    exp['Type'] = `
            # Climbing Routes
            type Route{
                id: Int!
                name: String
                createdAt: String
                updatedAt: String
                deletedAt: String
                rock: Rock
            }

    `;

    exp['QueriesDeclaration'] = `
            # Climbing Rocks
            routes(id: Int, RockId: Int): [Route]
    `;

    exp['Queries'] = {
        routes: (root, args) => { return models.Route.findAll({ where: args}); }
    };

    exp['Mutations'] = {};

    exp['Resolver'] = {
                Route:{
                    name: (route) => (route.routename),
                    createdAt: (route) => {
                        return route.createdAt.toISOString();
                    },
                    updatedAt: (route) => {
                        return route.updatedAt.toISOString();
                    },
                    deletedAt: (route) => {
                        if (route.deletedAt != null){
                            return route.deletedAt.toISOString();
                        } else {
                            return null;
                        }
                    },
                    rock: (route) => { return route.getRock(); }
                }
            }

    return exp;
}