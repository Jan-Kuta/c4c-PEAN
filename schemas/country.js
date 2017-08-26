module.exports = (models) => {

    var exp = {};

    exp['Type'] = `
            # Countries of the world
            type Country{
                id: Int!
                name: String
                areas: [Area]
            }
            `;

    exp['QueriesDeclaration'] = `
            # Countries of the world
            countries(id: Int): [Country]            
    `;

    exp['Queries'] = {
        countries: (root, args) => { return models.Country.findAll({ where: args}); }
    };

    exp['Resolver']= {
                Country: {
                    name: (country) => (country.countryname),
                    areas: (country) => { return country.getAreas(); }
                }
            };

    return exp;
}