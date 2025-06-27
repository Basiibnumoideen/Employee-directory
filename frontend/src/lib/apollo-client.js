// src/lib/apollo-client.js
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT, // ✅ From .env
  cache: new InMemoryCache(),
});

export default client;
