'use strict';
// The ApolloServer constructor requires two parameters: your schema

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';

import cors from 'cors';
import express from 'express';
import db from '#database';
import resolvers from '#resolvers';
import typeDefs from '#types';
import uploadRoutes from '#routes/upload';

// Required logic for integrating with Express
const app = express();
// Our httpServer handles incoming requests to our Express app.
// Below, we tell Apollo Server to "drain" this httpServer,
// enabling our servers to shut down gracefully.
// const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
// Ensure we wait for our server to start
await server.start();

// Set up file upload routes (before GraphQL middleware)
app.use('/api/v1', cors(), uploadRoutes);

// Set up our Express middleware to handle CORS, body parsing,
// and our expressMiddleware function.
app.use(
  '/',
  cors(),
  express.json(),
  // expressMiddleware accepts the same arguments:
  // an Apollo Server instance and optional configuration options
  expressMiddleware(server, {
    context: async ({ req, res }) => ({ db, req, res }),
  }),
);

// await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
// console.log(`🚀 Server ready at http://localhost:4000/`);

app.listen(3000, () => {
  console.log(`🚀 Server ready at http://localhost:3000/`);
});

export default app;
