const { ApolloServer, gql } = require('apollo-server')
const PORT = process.env.PORT || 5812


const typeDefs = gql`

    type User {
        id: ID! # id do usuário
        name: String # nome do usuário
    }

    # get
    type Query {
        users: [User!]! # lista de usuários 
        getUserById(id: ID!): User! # retorna um usuário pelo id
        getUserByName(name: String!): User! # retorna um usuário pelo nome
    }

    # put
    type Mutation {
        createUser(name: String!): User!
    }
`

// users para teste
const users = [
    {id:0, name:"jessé"},
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
    
    Mutation: {
        createUser: (_, args) => {
            const newUser = {
                id: users.at(-1).id+1,
                name: args.name,
            }
            users.push(newUser)
            return newUser
        }
    }
}


// cria o servidor
const server = new ApolloServer({typeDefs, resolvers})

// começa a escutar a porta
server.listen(PORT).then(({url}) => 
    console.log(`Servidor online -> ${url}`))
