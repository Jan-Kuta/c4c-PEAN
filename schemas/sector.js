module.exports = (models) => {
    var exp = {};

    exp['Type'] = `
            # Climbing Sectors
            type Sector{
                id: Int!
                name: String
                coordinates: Coordinates
                createdAt: String
                updatedAt: String
                deletedAt: String
                area: Area
                rocks: [Rock]
            }

    `;

    exp['QueriesDeclaration'] = `
            # Climbing Sectors
            sectors(id: Int, AreaId: Int): [Sector]
    `;

    exp['Queries'] = {
        sectors: (root, args) => { return models.Sector.findAll({ where: args}); }
    };

    exp['Mutations'] = {};

    exp['Resolver'] = {
                Sector:{
                    name: (sector) => (sector.sectorname),
                    coordinates: (sector) => {
                        return { lat: sector.location.coordinates[1], lng: sector.location.coordinates[0] };
                    },
                    createdAt: (sector) => {
                        return sector.createdAt.toISOString();
                    },
                    updatedAt: (sector) => {
                        return sector.updatedAt.toISOString();
                    },
                    deletedAt: (sector) => {
                        if (sector.deletedAt != null){
                            return sector.deletedAt.toISOString();
                        } else {
                            return null;
                        }
                    },
                    area: (sector) => { return sector.getArea(); },
                    rocks: (sector) => { return sector.getRocks(); }
                }
            }

    return exp;
}