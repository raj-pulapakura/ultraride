"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagGraphql = void 0;
const type_graphql_1 = require("type-graphql");
const BaseGraphql_1 = require("../../objects/BaseGraphql");
let TagGraphql = class TagGraphql extends BaseGraphql_1.BaseGraphql {
    productId;
    text;
};
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID)
], TagGraphql.prototype, "productId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String)
], TagGraphql.prototype, "text", void 0);
TagGraphql = __decorate([
    (0, type_graphql_1.ObjectType)()
], TagGraphql);
exports.TagGraphql = TagGraphql;
