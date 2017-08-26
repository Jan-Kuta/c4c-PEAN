module.exports = (models) => {
    var exp = {};

    exp['Type'] = `
            # Climbing Rocks
            type Rock{
                id: Int!
                name: String
                coordinates: Coordinates
                createdAt: String
                updatedAt: String
                deletedAt: String
                sector: Sector
                routes: [Route]
            }

    `;

    exp['QueriesDeclaration'] = `
            # Climbing Rocks
            rocks(id: Int, SectorId: Int): [Rock]
    `;

    exp['Queries'] = {
        rocks: (root, args) => { return models.Rock.findAll({ where: args}); }
    };

    exp['Mutations'] = {};

    exp['Resolver'] = {
                Rock:{
                    name: (rock) => (rock.rockname),
                    coordinates: (rock) => {
                        return { lat: rock.location.coordinates[1], lng: rock.location.coordinates[0] };
                    },
                    createdAt: (rock) => {
                        return rock.createdAt.toISOString();
                    },
                    updatedAt: (rock) => {
                        return rock.updatedAt.toISOString();
                    },
                    deletedAt: (rock) => {
                        if (rock.deletedAt != null){
                            return rock.deletedAt.toISOString();
                        } else {
                            return null;
                        }
                    },
                    sector: (rock) => { return rock.getSector(); },
                    routes: (rock) => { return rock.getRoutes(); }
                }
            }

    return exp;
}