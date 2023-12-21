"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const ProductEntity_1 = require("../features/Product/ProductEntity");
const TagEntity_1 = require("../features/Tag/TagEntity");
const TagService_1 = require("./TagService");
class ProductService {
    static async checkProductExists(name) {
        const productAlreadyExists = await ProductEntity_1.ProductEntity.findOne({
            where: { name },
        });
        return !!productAlreadyExists;
    }
    static async createProduct(input) {
        const { name, description, price, category, imageUrl, tags, brand } = input;
        const productAlreadyExists = await ProductService.checkProductExists(name);
        if (productAlreadyExists) {
            return {
                error: {
                    field: "name",
                    message: "a product with that name already exists",
                    ufm: "A product with that name already exists. Please enter a different one.",
                },
            };
        }
        const newProduct = await ProductEntity_1.ProductEntity.create({
            name,
            description,
            price,
            category,
            imageUrl,
            brand,
        }).save();
        TagService_1.TagService.createTags(tags, newProduct.id);
        const createdTags = (await TagEntity_1.TagEntity.find({ productId: newProduct.id })).map((tag) => ({
            id: tag.id,
            text: tag.text,
            productId: tag.productId,
            createdAt: tag.createdAt,
            updatedAt: tag.updatedAt,
        }));
        return {
            product: {
                id: newProduct.id,
                category: newProduct.category,
                imageUrl: newProduct.imageUrl,
                description: newProduct.description,
                price: newProduct.price,
                createdAt: newProduct.createdAt,
                updatedAt: newProduct.updatedAt,
                name: newProduct.name,
                tags: createdTags,
                brand: newProduct.brand,
            },
        };
    }
    static async updateProduct(input) {
        const { id, name, category, imageUrl, description, price, tags, brand } = input;
        const productById = await ProductEntity_1.ProductEntity.findOne(id);
        if (!productById) {
            return {
                error: {
                    field: "id",
                    message: "a product with that id does not exist",
                    ufm: "A message with that id does not exist",
                },
            };
        }
        const existingProduct = await ProductEntity_1.ProductEntity.findOne({ where: { name } });
        if (existingProduct && existingProduct.id.toString() !== id) {
            return {
                error: {
                    field: "name",
                    message: "a product with that name already exists",
                    ufm: "A product with that name already exists. Please enter a different one.",
                },
            };
        }
        const updateProductName = name || existingProduct?.name;
        const updateProductCategory = category || existingProduct?.category;
        const updateProductDescription = description || existingProduct?.description;
        const updateProductImageUrl = imageUrl || existingProduct?.imageUrl;
        const updateProductPrice = price || existingProduct?.price;
        const updateProductBrand = brand || existingProduct?.brand;
        const partialEntity = {};
        if (updateProductName) {
            partialEntity.name = updateProductName;
        }
        if (updateProductCategory) {
            partialEntity.category = updateProductCategory;
        }
        if (updateProductDescription) {
            partialEntity.description = updateProductDescription;
        }
        if (updateProductImageUrl) {
            partialEntity.imageUrl = updateProductImageUrl;
        }
        if (updateProductPrice) {
            partialEntity.price = updateProductPrice;
        }
        if (updateProductBrand) {
            partialEntity.brand = updateProductBrand;
        }
        try {
            // update product
            await ProductEntity_1.ProductEntity.update(id, partialEntity);
            if (tags) {
                // delete old tags
                await TagEntity_1.TagEntity.delete({ productId: id });
                // create new tags
                TagService_1.TagService.createTags(tags, id);
            }
            // fetch new product
            const newProduct = await ProductEntity_1.ProductEntity.findOne(id);
            const newTags = (await TagEntity_1.TagEntity.find({ where: { productId: id } })).map((tag) => ({
                text: tag.text,
                id: tag.id,
                createdAt: tag.createdAt,
                updatedAt: tag.updatedAt,
                productId: id,
            }));
            if (!newProduct) {
                throw new Error("New Product is undefined");
            }
            return {
                product: {
                    id: newProduct.id,
                    category: newProduct.category,
                    imageUrl: newProduct.imageUrl,
                    description: newProduct.description,
                    price: newProduct.price,
                    name: newProduct.name,
                    createdAt: newProduct.createdAt,
                    updatedAt: newProduct.updatedAt,
                    tags: newTags,
                    brand: newProduct.brand,
                },
            };
        }
        catch (e) {
            console.error(e);
            return {
                error: {
                    field: "",
                    message: "something unexpected occurred",
                    ufm: "something unexpected occurred",
                },
            };
        }
    }
}
exports.ProductService = ProductService;
