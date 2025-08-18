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

// This is for vercel
let handler;

// This is for local
if (process.env.NODE_ENV === 'local') {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: () => {
      return { db };
    },
  });

  console.log(`🚀  Server ready at: ${url}`);
} else {
  // This is for vercel
  handler = startServerAndCreateNextHandler(server, {
    listen: { port: 4000 },
    context: () => {
      return { db };
    },
  });
}

export default handler;
