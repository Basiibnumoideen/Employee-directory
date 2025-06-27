const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const { connectDB } = require('./db');

async function startServer() {
  await connectDB();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    persistedQueries: false,
  });

  const PORT = process.env.PORT || 4000;

  server.listen({
    port: PORT,
    cors: {
  origin: [
    "http://localhost:3000", 
    "https://employee-directory-olive.vercel.app"
  ],
  credentials: true,
}

  }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
}

startServer();
