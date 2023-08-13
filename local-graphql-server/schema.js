const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello, GraphQL!',
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
