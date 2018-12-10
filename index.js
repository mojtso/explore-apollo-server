import './src';

// const { ApolloServer, gql } = require('apollo-server');
// const { graphql, buildSchema } = require('graphql');

// const crypto = require('crypto');

// const db = {
//     users:[
//         {id: "1", email: 'me@mail.com', name: 'Me'},
//         {id: "2", email: 'em@mail.com', name: 'Em'},
//     ],
//     messages: [
//         { id: '1', userId: '1', body: 'Hello World', createdAt: Date.now() },
//         { id: '2', userId: '2', body: 'hey World!', createdAt: Date.now() }
//     ]
// }

// const typeDefs = gql`
//      type Query {
//          users: [User!]!
//          user(id: ID!): User
//          messages: [Message!]!
//      }
//      type Mutation {
//          addUser(email: String!, name: String): User!
//      }   
//      type User {
//          id: ID!
//          email: String!
//          name: String
//          avatarUrl: String
//          messages: [Message!]
//      }
//      type Message {
//          id: ID!
//          userId: ID!
//          body: String!
//          createdAt: String
//      }
//      `;

// const resolvers = {
//     Query: {
//         users: () => db.users,
//         user: (root, { id }) => db.users.find(user => user.id == id),
//         messages: () => db.messages,
//     },
//     Mutation: {
//         addUser: (root, { email, name }) => {
//             const user = {
//                 id: crypto.randomBytes(10).toString('hex'),
//                 email,
//                 name
//             };
//             db.users.push(user);
//             return user;
//         }
//     },
//     User: {
//         messages: user => db.messages.filter(message => message.userId === user.id),
//     }
// };


// const server = new ApolloServer({ typeDefs, resolvers });

// server.listen().then(url  => console.log(url));