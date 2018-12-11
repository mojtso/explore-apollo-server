import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import session from 'express-session';
import connectRedis from 'connect-redis';

import typeDefs from './typeDefs';
import resolvers from './resolvers';
import mongoose from 'mongoose';
import { 
  APP_PORT, IN_PROD,
  DB_USERNAME, DB_PASSWORD,
  DB_PORT, DB_NAME, 
  SESS_NAME, SESS_SECRET, SESS_LIFETIME,
  REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } from './config';
  import { createClient as createRedisClient } from 'redis';


(async () => {

  try {
    await mongoose.connect(`mongodb://localhost:${DB_PORT}/${DB_NAME}`,
      { useNewUrlParser: true }
    );

    const app = express();
    
    // const RedisStore = connectRedis(session);
    
    // const store = RedisStore({
    //   host: REDIS_HOST,
    //   port: REDIS_PORT,
    // });
    
    const redisClient = createRedisClient({
      host: REDIS_HOST,
      port: REDIS_PORT,
    }); 

    const RedisStore = connectRedis(session);
    const store = new RedisStore({
      client: redisClient
    });

    app.use(session({
      store, 
      name: SESS_NAME,
      secret: SESS_SECRET,
      cookie: {
        maxAge: SESS_LIFETIME,
        sameSite: true,
        secure: IN_PROD
      }
    }));

    app.disable('x-powered-by');


    const server = new ApolloServer({
      // These will be defined for both new or existing servers
      typeDefs,
      resolvers,
      playground: !IN_PROD,
      context: ({ req, res }) => { return { req, res } }
    });

    server.applyMiddleware({ app }); // app is from an existing express app

    app.listen({ port: APP_PORT }, () =>
      console.log(`🚀 Server ready at http://localhost:${APP_PORT}${server.graphqlPath}`)
    );
  }catch(e) {
    console.error(e);
  }

})();