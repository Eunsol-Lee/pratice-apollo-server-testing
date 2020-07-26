const { gql } = require('apollo-server');

module.exports = gql`
  type User {
    id: ID!
    name: String!
  }

  type Query {
    findUser(id: ID!): User
  }

  type Mutation {
    deleteUser(id: ID!): Boolean
  }
`;
