'use strict';
// The ApolloServer constructor requires two parameters: your schema

import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import typeDefs from '../src/graphql/types/index.js';
import resolvers from '../src/graphql/resolvers/index.js';
import db from '../src/database/index.js';
import { startStandaloneServer } from '@apollo/server/standalone';

// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const data = db.User.findAll({
  page: 1,
  limit: 10,
  scopes: 'all',
});

console.log(data);

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
// const { url } = await startStandaloneServer(server, {
//   listen: { port: 4000 },
// });

// console.log(`🚀  Server ready at: ${url}`);

let handler;

if (!process.env.VERCEL_ENV) {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
} else {
  handler = startServerAndCreateNextHandler(server, {
    listen: { port: 4000 },
  });
}

export default handler;
