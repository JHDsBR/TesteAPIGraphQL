const { ApolloServer, gql } = require('apollo-server')
const PORT = process.env.PORT || 5812

const typeDefs = gql`

    type User {
        id: ID!
        name: String
    }

    type Query {
        users: [User!]! # lista de usuários 
        getUserById(id: ID!): User! # retorna um usuário pelo id
        getUserByName(name: String!): User! # retorna um usuário pelo nome
    }
`

const users = [
    {id:0, name:"jesse"},
    {id:1, name:"felipe"},
    {id:2, name:"tom"},
    {id:3, name:"sarah"},
    {id:4, name:"pelé"},
]

const resolvers = {
    Query: {
        users: () => users,
        getUserById: (_, args) => {return users.find((user) => user.id == args.id)},
        getUserByName: (_, args) => {return users.find((user) => user.name == args.name)},
    },
}

const server = new ApolloServer({typeDefs, resolvers})


server.listen(PORT).then(({url}) => 
    console.log(`Servidor online -> ${url}`))
