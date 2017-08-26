module.exports = (models) => {

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

    exp['QueriesDeclaration'] = `
            # get user
            user(id: Int!): User         
    `;

    exp['Queries'] = {
        user: (root, args) => { return models.User.find({ where: args}); }
    };

    exp['Resolver']= {
                User: {
                    name: (user) => (user.username),
                    createdAt: (user) => {
                        return user.createdAt.toISOString();
                    },
                    updatedAt: (user) => {
                        return user.updatedAt.toISOString();
                    },
                    deletedAt: (user) => {
                        if (user.deletedAt != null){
                            return user.deletedAt.toISOString();
                        } else {
                            return null;
                        }
                    }
                }
            };
    
    return exp;
}