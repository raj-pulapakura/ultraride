"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConfig = void 0;
const constants_1 = require("../constants");
const AccountEntity_1 = require("../features/Account/AccountEntity");
const ProductEntity_1 = require("../features/Product/ProductEntity");
const TagEntity_1 = require("../features/Tag/TagEntity");
exports.dbConfig = {
    username: constants_1.env.DB_USERNAME,
    password: constants_1.env.DB_PASSWORD,
    database: constants_1.env.DB_DATABASE,
    host: constants_1.env.DB_HOST,
    port: constants_1.env.DB_PORT,
    type: "mysql",
    synchronize: true,
    entities: [AccountEntity_1.AccountEntity, ProductEntity_1.ProductEntity, TagEntity_1.TagEntity],
};
