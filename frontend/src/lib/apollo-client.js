// src/lib/apollo-client.js
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri:  'https://employee-directory-9fnq.onrender.com',
  cache: new InMemoryCache(),
});

export default client;
