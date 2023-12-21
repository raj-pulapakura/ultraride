"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductResolver = void 0;
const type_graphql_1 = require("type-graphql");
const ProductEntity_1 = require("./ProductEntity");
const ProductGraphql_1 = require("./ProductGraphql");
const ProductGeneralResponse_1 = require("./objects/ProductGeneralResponse");
const CreateProductInput_1 = require("./inputs/CreateProductInput");
const TagEntity_1 = require("../Tag/TagEntity");
const UpdateProductInput_1 = require("./inputs/UpdateProductInput");
const ProductService_1 = require("../../services/ProductService");
let ProductResolver = class ProductResolver {
    async product(productIdOrName) {
        let product;
        product = await ProductEntity_1.ProductEntity.findOne(productIdOrName);
        if (!product) {
            product = await ProductEntity_1.ProductEntity.findOne({
                where: { name: productIdOrName },
            });
        }
        if (!product) {
            return null;
        }
        const { id, category, price, imageUrl, name, createdAt, updatedAt, description, brand, } = product;
        const tags = (await TagEntity_1.TagEntity.find({ productId: id })).map((tag) => ({
            id: tag.id,
            text: tag.text,
            productId: tag.productId,
            createdAt: tag.createdAt,
            updatedAt: tag.updatedAt,
        }));
        return {
            id,
            category,
            price,
            imageUrl,
            name,
            createdAt,
            updatedAt,
            description,
            tags,
            brand,
        };
    }
    async products() {
        const productEntities = await ProductEntity_1.ProductEntity.find({});
        const productObjects = [];
        for (const productEntity of productEntities) {
            const productObject = await this.product(productEntity.id);
            if (productObject) {
                productObjects.push(productObject);
            }
        }
        return productObjects;
    }
    async createProduct({ req }, createProductInput) {
        // if (!adminIsLoggedIn(req)) {
        //   return {
        //     error: {
        //       field: "",
        //       message: "You are not authorised to do that",
        //       ufm: "You are not authorised to do that",
        //     },
        //   };
        // }
        return await ProductService_1.ProductService.createProduct(createProductInput);
    }
    async updateProduct(updateProductInput) {
        return await ProductService_1.ProductService.updateProduct(updateProductInput);
    }
    async deleteProduct(productIdOrName) {
        try {
            await ProductEntity_1.ProductEntity.delete({ id: productIdOrName }); // throws error if cannot delete
            return true;
        }
        catch (e) {
            try {
                await ProductEntity_1.ProductEntity.delete({ name: productIdOrName });
                return true;
            }
            catch (e) {
                return false;
            }
        }
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => ProductGraphql_1.ProductGraphql, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("productIdOrName", () => type_graphql_1.ID))
], ProductResolver.prototype, "product", null);
__decorate([
    (0, type_graphql_1.Query)(() => [ProductGraphql_1.ProductGraphql])
], ProductResolver.prototype, "products", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => ProductGeneralResponse_1.ProductGeneralResponse, { nullable: true }),
    __param(0, (0, type_graphql_1.Ctx)()),
    __param(1, (0, type_graphql_1.Arg)("input", () => CreateProductInput_1.CreateProductInput))
], ProductResolver.prototype, "createProduct", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => ProductGeneralResponse_1.ProductGeneralResponse),
    __param(0, (0, type_graphql_1.Arg)("input", () => UpdateProductInput_1.UpdateProductInput))
], ProductResolver.prototype, "updateProduct", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("productIdOrName", () => String))
], ProductResolver.prototype, "deleteProduct", null);
ProductResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], ProductResolver);
exports.ProductResolver = ProductResolver;
