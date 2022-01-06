import { CreateProductInput } from "../features/Product/inputs/CreateProductInput";
import { UpdateProductInput } from "../features/Product/inputs/UpdateProductInput";
import { ProductGeneralResponse } from "../features/Product/objects/ProductGeneralResponse";
import { ProductEntity } from "../features/Product/ProductEntity";
import { TagEntity } from "../features/Tag/TagEntity";
import { TagGraphql } from "../features/Tag/TagGraphql";
import { TagService } from "./TagService";

export class ProductService {
  static async checkProductExists(name: string): Promise<boolean> {
    const productAlreadyExists = await ProductEntity.findOne({
      where: { name },
    });
    return !!productAlreadyExists;
  }

  static async createProduct(
    input: CreateProductInput
  ): Promise<ProductGeneralResponse> {
    const { name, description, price, category, imageUrl, tags } = input;
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

    const newProduct = await ProductEntity.create({
      name,
      description,
      price,
      category,
      imageUrl,
    }).save();

    TagService.createTags(tags, newProduct.id);

    const createdTags = (
      await TagEntity.find({ productId: newProduct.id })
    ).map((tag) => ({
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
      },
    };
  }

  static async updateProduct(
    input: UpdateProductInput
  ): Promise<ProductGeneralResponse> {
    const { id, name, category, imageUrl, description, price, tags } = input;

    const productById = await ProductEntity.findOne(id);

    if (!productById) {
      return {
        error: {
          field: "id",
          message: "a product with that id does not exist",
          ufm: "A message with that id does not exist",
        },
      };
    }

    const existingProduct = await ProductEntity.findOne({ where: { name } });

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
    const updateProductDescription =
      description || existingProduct?.description;
    const updateProductImageUrl = imageUrl || existingProduct?.imageUrl;
    const updateProductPrice = price || existingProduct?.price;

    const partialEntity: {
      name?: string;
      category?: string;
      description?: string;
      imageUrl?: string;
      price?: number;
    } = {};

    if (updateProductName) {
      partialEntity.name = updateProductName;
    }

    if (updateProductCategory) {
      partialEntity.category = category;
    }

    if (updateProductDescription) {
      partialEntity.description = description;
    }

    if (updateProductImageUrl) {
      partialEntity.imageUrl = imageUrl;
    }

    if (updateProductPrice) {
      partialEntity.price = price;
    }

    try {
      // update product
      await ProductEntity.update(id, partialEntity);

      if (tags) {
        // delete old tags
        await TagEntity.delete({ productId: id });

        // create new tags
        TagService.createTags(tags, id);
      }

      // fetch new product
      const newProduct = await ProductEntity.findOne(id);
      const newTags: TagGraphql[] = (
        await TagEntity.find({ where: { productId: id } })
      ).map((tag) => ({
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
        },
      };
    } catch (e) {
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
