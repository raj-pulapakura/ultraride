"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagEntity = void 0;
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../../objects/BaseModel");
const ProductEntity_1 = require("../Product/ProductEntity");
let TagEntity = class TagEntity extends BaseModel_1.BaseModel {
    productId;
    product;
    text;
};
__decorate([
    (0, typeorm_1.Column)({ type: "string" })
], TagEntity.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ProductEntity_1.ProductEntity, (product) => product.tags, {
        onDelete: "CASCADE",
    })
], TagEntity.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar" })
], TagEntity.prototype, "text", void 0);
TagEntity = __decorate([
    (0, typeorm_1.Entity)("tag")
], TagEntity);
exports.TagEntity = TagEntity;
