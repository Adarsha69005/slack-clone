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
import { refreshTokenServer } from './auth';

const SECRET = "qwertyasdfghjkl"
const SECRET2 = "AAqwertyasdfghjkl"

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

  const addUser = async (req, res) => {
    const token = req.headers['x-token'];
    if(token) {
      try {
        const { user } = jwt.verify(token, SECRET);
        // req.user = user;
        return user;
      } catch (err) {
        const refreshToken = req.headers['x-refresh-token'];
        const newTokens = await refreshTokenServer(token, refreshToken, models, SECRET, SECRET2);
        if(newTokens.token && newTokens.refreshToken) {
          res.set('Access-Control-Expose-Headers', 'x-token, x-refresh-token');
          res.set('x-token', newTokens.token);
          res.set('x-refresh-token', newTokens.refreshToken);
        }
        // req.user = newTokens.user;
         const user = newTokens.user;
        return user
      }
    }
  };

  // Same ApolloServer initialization as before, plus the drain plugin.
  const server = new ApolloServer({
    typeDefs,
    cors: cors(corsOptions),
    resolvers,
    context: async ({req, res}) => {
      // models
      // ['x-token'],['x-refresh-token']
      const user = await addUser(req, res);
      console.log('at indexuser:',user);
      // const token = req.headers.authorization || '';
      
      // user = req.user
      // SECRET
      // SECRET2
      return {models, user, SECRET, SECRET2}
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
