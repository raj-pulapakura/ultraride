"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRedisStore = void 0;
const getRedisStore = (redisClient, key) => {
    return new Promise((resolve, reject) => redisClient.get(key, (error, reply) => {
        if (error) {
            return reject(error);
        }
        return resolve(reply);
    }));
};
exports.getRedisStore = getRedisStore;
