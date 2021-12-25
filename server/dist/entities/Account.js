"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("./BaseModel");
let Account = class Account extends BaseModel_1.BaseModel {
    firstName;
    lastName;
    email;
    password;
    role;
};
__decorate([
    (0, typeorm_1.Column)({ type: "varchar" }),
    (0, type_graphql_1.Field)(() => String)
], Account.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar" }),
    (0, type_graphql_1.Field)(() => String)
], Account.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar" }),
    (0, type_graphql_1.Field)(() => String)
], Account.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar" }),
    (0, type_graphql_1.Field)(() => String)
], Account.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", default: "consumer" }),
    (0, type_graphql_1.Field)(() => String)
], Account.prototype, "role", void 0);
Account = __decorate([
    (0, typeorm_1.Entity)(),
    (0, type_graphql_1.ObjectType)()
], Account);
exports.Account = Account;
