"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountAdminLoginInput = void 0;
const type_graphql_1 = require("type-graphql");
let AccountAdminLoginInput = class AccountAdminLoginInput {
    adminId;
    adminPassword;
};
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID)
], AccountAdminLoginInput.prototype, "adminId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String)
], AccountAdminLoginInput.prototype, "adminPassword", void 0);
AccountAdminLoginInput = __decorate([
    (0, type_graphql_1.InputType)()
], AccountAdminLoginInput);
exports.AccountAdminLoginInput = AccountAdminLoginInput;
