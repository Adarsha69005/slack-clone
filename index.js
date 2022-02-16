import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';
import http from 'http';
// import typeDefs from './schema';
// import resolvers from './resolvers';
import cors from 'cors';
import path from 'path';
import models from './models';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';

const typeDefs = mergeTypeDefs(loadFilesSync(path.join(__dirname, './schema')));

const resolvers = mergeResolvers(loadFilesSync(path.join(__dirname, './resolvers')));


async function startApolloServer(typeDefs, resolvers) {
  // Required logic for integrating with Express
  const app = express();
  const httpServer = http.createServer(app);

  const corsOptions = {
    origin: "http://localhost:3000/",
    credentials: true
  }

  // Same ApolloServer initialization as before, plus the drain plugin.
  const server = new ApolloServer({
    typeDefs,
    cors: cors(corsOptions),
    resolvers,
    context: { 
      models,
      user: {
        id: 1,
      },
     },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  // app.use(cors('*'));
  // More required logic for integrating with Express
  await models.sequelize.sync();
  await server.start()
  server.applyMiddleware({
    app,

    // By default, apollo-server hosts its GraphQL endpoint at the
    // server root. However, *other* Apollo Server packages host it at
    // /graphql. Optionally provide this to match apollo-server.
    path: '/',
  });

  // Modified server startup
  await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers);
