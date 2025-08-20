'use strict';
// The ApolloServer constructor requires two parameters: your schema

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';

import cors from 'cors';
import express from 'express';
import db from '../src/database/index.js';
import resolvers from '../src/graphql/resolvers/index.js';
import typeDefs from '../src/graphql/types/index.js';

const app = express();

app.use(express.json());

// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, res }) => {
    return { db, req, res };
  },
});

await server.start();

app.use('/', cors(), express.json(), expressMiddleware(server));

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
