require('dotenv').config(); // 👈 load .env

const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const { connectDB } = require('./db');

async function startServer() {
  await connectDB();

  // 🔽 Parse comma-separated origins into array
  const allowedOrigins = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',').map(origin => origin.trim())
    : [];

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    persistedQueries: false,
  });

  const PORT = process.env.PORT || 4000;

  server.listen({
    port: PORT,
    cors: {
      origin: allowedOrigins,
      credentials: true,
    },
  }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
}

startServer();
