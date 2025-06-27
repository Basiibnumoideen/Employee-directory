// index.js
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const { connectDB } = require('./db');

async function startServer() {
  await connectDB();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    persistedQueries: false, // ✅ Disables unbounded cache warning
  });

  const PORT = process.env.PORT || 4000;

  server.listen({ port: PORT }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
}

startServer();
