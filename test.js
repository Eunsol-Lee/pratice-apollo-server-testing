const { ApolloServer, gql } = require('apollo-server');
const { createTestClient } = require('apollo-server-testing');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { query, mutate } = createTestClient(server);

test('find user', async () => {
  const FIND_USER = gql`
    query {
      findUser(id: "1") {
        id
        name
      }
    }
  `;

  const {
    data: { findUser },
  } = await query({ query: FIND_USER });

  expect(findUser).toEqual({ id: '1', name: 'Name1' });
});

test('throw error if user is not founc', async () => {
  const FIND_USER = gql`
    query {
      findUser(id: "10") {
        id
        name
      }
    }
  `;

  const {
    errors: [error],
  } = await query({ query: FIND_USER });
});

test('delete user', async () => {
  const DELETE_USER = gql`
    mutation($id: ID!) {
      deleteUser(id: $id)
    }
  `;

  const {
    data: { deleteUser },
  } = await mutate({ mutation: DELETE_USER, variables: { id: '1' } });

  expect(deleteUser).toBeTruthy();
});

test('can not delete user twice', async () => {
  const DELETE_USER = gql`
    mutation($id: ID!) {
      deleteUser(id: $id)
    }
  `;

  const {
    data: { deleteUser },
  } = await mutate({ mutation: DELETE_USER, variables: { id: '1' } });

  expect(deleteUser).toBeFalsy();
});
