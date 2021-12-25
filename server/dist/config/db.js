"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConfig = void 0;
const constants_1 = require("../constants");
const Account_1 = require("../entities/Account");
exports.dbConfig = {
    username: constants_1.env.DB_USERNAME,
    password: constants_1.env.DB_PASSWORD,
    database: constants_1.env.DB_DATABASE,
    host: constants_1.env.DB_HOST,
    port: constants_1.env.DB_PORT,
    type: "mysql",
    synchronize: true,
    entities: [Account_1.Account],
};
