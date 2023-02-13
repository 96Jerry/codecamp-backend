import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const typeDefs = `
    # A simple type for getting started.

  type Query {
    hello: Int
  }
`;

const resolvers = {
  Query: {
    hello: () => 10,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 3001 },
});

console.log(`🚀  Server ready at: ${url}`);
