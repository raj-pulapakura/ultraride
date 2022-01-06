import "reflect-metadata";
import express from "express";
import cors from "cors";
import session from "express-session";
import { corsConfig } from "./config/cors";
import connectRedis from "connect-redis";
import { AUTH_COOKIE, env, SECRET } from "./constants";
import { connectToRedis } from "./utils/connectToRedis";
import { connectToDB } from "./utils/connectToDB";
import { sessionCookieConfig } from "./config/sessionCookie";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { AccountResolver } from "./features/Account/AccountResolver";
import { ProductResolver } from "./features/Product/ProductResolver";
import cookieParser from "cookie-parser";
import { Context } from "./types";
import { getRedisStore } from "./utils/getRedisStore";

const main = async () => {
  console.log("Starting server...");
  const app = express();

  await connectToDB();

  app.use(cors(corsConfig));
  app.use(cookieParser());

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

  app.use(async (req, _res, next) => {
    const reqContext = req as Context["req"];

    const loginFailed = () => {
      reqContext.session.adminLoggedIn = false;
      return next();
    };

    const adminCookie = req.cookies["admin-cookie"];

    // check if cookie exists
    if (!adminCookie) {
      return loginFailed();
    }

    // get value from redis store
    const value = (await getRedisStore(redisClient, adminCookie)) as
      | string
      | null;

    // check if value exists
    if (!value) {
      return loginFailed();
    }

    // parse value (JSON)
    const adminObj = JSON.parse(value);

    // validate obj
    if (
      adminObj.adminId !== env.ADMIN_ID ||
      adminObj.adminPassword !== env.ADMIN_PASSWORD
    ) {
      return loginFailed();
    }

    reqContext.session.adminLoggedIn = true;
    next();
  });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      validate: false,
      resolvers: [AccountResolver, ProductResolver],
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
