"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDB = void 0;
const typeorm_1 = require("typeorm");
const db_1 = require("../config/db");
const delay_1 = require("./delay");
const connectToDB = async () => {
    try {
        console.log("Trying to connect to db");
        const conn = await (0, typeorm_1.createConnection)(db_1.dbConfig);
        console.log("Connected to db");
        return conn;
    }
    catch (e) {
        console.log("Failed to connect to db because...");
        console.error(e);
        await (0, delay_1.delay)(3000);
        return await (0, exports.connectToDB)();
    }
};
exports.connectToDB = connectToDB;
