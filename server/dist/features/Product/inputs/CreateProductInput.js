"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductInput = void 0;
const type_graphql_1 = require("type-graphql");
let CreateProductInput = class CreateProductInput {
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
], CreateProductInput.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String)
], CreateProductInput.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Float)
], CreateProductInput.prototype, "price", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String)
], CreateProductInput.prototype, "category", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String)
], CreateProductInput.prototype, "imageUrl", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [String])
], CreateProductInput.prototype, "tags", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String)
], CreateProductInput.prototype, "brand", void 0);
CreateProductInput = __decorate([
    (0, type_graphql_1.InputType)()
], CreateProductInput);
exports.CreateProductInput = CreateProductInput;
