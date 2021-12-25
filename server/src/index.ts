import "reflect-metadata";
import express from "express";
import cors from "cors";
import session from "express-session";
import { corsConfig } from "./config/cors";
import connectRedis from "connect-redis";
import { AUTH_COOKIE, SECRET } from "./constants";
import { connectToRedis } from "./utils/connectToRedis";
import { connectToDB } from "./utils/connectToDB";
import { sessionCookieConfig } from "./config/sessionCookie";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { AccountResolver } from "./resolvers/AccountResolver";
import { CategoryResolver } from "./resolvers/CategoryResolver";
import { ProductResolver } from "./resolvers/ProductResolver";
import { PurchaseResolver } from "./resolvers/PurchaseResponse";

const main = async () => {
  console.log("Starting server...");
  const app = express();

  await connectToDB();

  app.use(cors(corsConfig));

  const RedisStore = connectRedis(session);
  const redisClient = await connectToRedis();

  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      cookie: sessionCookieConfig,
      resave: false,
      saveUninitialized: false,
      secret: SECRET,
      name: AUTH_COOKIE,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      validate: false,
      resolvers: [
        AccountResolver,
        CategoryResolver,
        ProductResolver,
        PurchaseResolver,
      ],
    }),
    context: ({ req, res }) => ({ req, res, redis: redisClient }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(80, () => {
    console.log("Connected to server");
  });
};

main().catch((e) => console.error(e));
