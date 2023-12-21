"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductEntity = void 0;
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../../objects/BaseModel");
const TagEntity_1 = require("../Tag/TagEntity");
let ProductEntity = class ProductEntity extends BaseModel_1.BaseModel {
    name;
    description;
    price;
    category;
    imageUrl;
    brand;
    tags;
};
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", unique: true })
], ProductEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" })
], ProductEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal" })
], ProductEntity.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar" })
], ProductEntity.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" })
], ProductEntity.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar" })
], ProductEntity.prototype, "brand", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => TagEntity_1.TagEntity, (tag) => tag.product)
], ProductEntity.prototype, "tags", void 0);
ProductEntity = __decorate([
    (0, typeorm_1.Entity)("product")
], ProductEntity);
exports.ProductEntity = ProductEntity;
