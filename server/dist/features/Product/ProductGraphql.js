"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductGraphql = void 0;
const type_graphql_1 = require("type-graphql");
const BaseGraphql_1 = require("../../objects/BaseGraphql");
const TagGraphql_1 = require("../Tag/TagGraphql");
let ProductGraphql = class ProductGraphql extends BaseGraphql_1.BaseGraphql {
    name;
    description;
    price;
    category;
    imageUrl;
    tags;
    brand;
};
__decorate([
    (0, type_graphql_1.Field)(() => String)
], ProductGraphql.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String)
], ProductGraphql.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Float)
], ProductGraphql.prototype, "price", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String)
], ProductGraphql.prototype, "category", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String)
], ProductGraphql.prototype, "imageUrl", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [TagGraphql_1.TagGraphql])
], ProductGraphql.prototype, "tags", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String)
], ProductGraphql.prototype, "brand", void 0);
ProductGraphql = __decorate([
    (0, type_graphql_1.ObjectType)()
], ProductGraphql);
exports.ProductGraphql = ProductGraphql;
