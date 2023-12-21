"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const cors_2 = require("./config/cors");
const connect_redis_1 = __importDefault(require("connect-redis"));
const constants_1 = require("./constants");
const connectToRedis_1 = require("./utils/connectToRedis");
const connectToDB_1 = require("./utils/connectToDB");
const sessionCookie_1 = require("./config/sessionCookie");
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const AccountResolver_1 = require("./features/Account/AccountResolver");
const ProductResolver_1 = require("./features/Product/ProductResolver");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const getRedisStore_1 = require("./utils/getRedisStore");
const main = async () => {
    console.log("Starting server...");
    const app = (0, express_1.default)();
    await (0, connectToDB_1.connectToDB)();
    app.use((0, cors_1.default)(cors_2.corsConfig));
    app.use((0, cookie_parser_1.default)());
    const RedisStore = (0, connect_redis_1.default)(express_session_1.default);
    const redisClient = await (0, connectToRedis_1.connectToRedis)();
    app.use((0, express_session_1.default)({
        store: new RedisStore({ client: redisClient }),
        cookie: sessionCookie_1.sessionCookieConfig,
        resave: false,
        saveUninitialized: false,
        secret: constants_1.SECRET,
        name: constants_1.AUTH_COOKIE,
    }));
    app.use(async (req, _res, next) => {
        const reqContext = req;
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
        const value = (await (0, getRedisStore_1.getRedisStore)(redisClient, adminCookie));
        // check if value exists
        if (!value) {
            return loginFailed();
        }
        // parse value (JSON)
        const adminObj = JSON.parse(value);
        // validate obj
        if (adminObj.adminId !== constants_1.env.ADMIN_ID ||
            adminObj.adminPassword !== constants_1.env.ADMIN_PASSWORD) {
            return loginFailed();
        }
        reqContext.session.adminLoggedIn = true;
        next();
    });
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            validate: false,
            resolvers: [AccountResolver_1.AccountResolver, ProductResolver_1.ProductResolver],
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
