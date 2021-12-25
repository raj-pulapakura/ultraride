"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToRedis = void 0;
const redis_1 = __importDefault(require("redis"));
const redis_2 = require("../config/redis");
const connectToRedis = () => {
    return new Promise((resolve, reject) => {
        const redisClient = redis_1.default.createClient(redis_2.redisConfig);
        redisClient.on("connect", () => {
            console.log("connected to cache");
            resolve(redisClient);
        });
        redisClient.on("error", () => {
            reject("redis not available");
        });
    });
};
exports.connectToRedis = connectToRedis;
