"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisConfig = void 0;
const constants_1 = require("../constants");
exports.redisConfig = {
    port: constants_1.env.REDIS_PORT,
    host: constants_1.env.REDIS_HOST,
};
