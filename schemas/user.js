var exp = {};

exp['Type'] = `
        # Users of our system
        type User{
            id: Int!
            name: String
            email: String
            createdAt: String
            updatedAt: String
            deletedAt: String
        }
        `;

exp['Resolver']= {
            User: {
                name: (user) => (user.username),
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
        };

module.exports = exp;