import { Arg, Query, Resolver, ID, Mutation, Ctx } from "type-graphql";
import { ProductEntity } from "./ProductEntity";
import { ProductGraphql } from "./ProductGraphql";
import { ProductGeneralResponse } from "./objects/ProductGeneralResponse";
import { CreateProductInput } from "./inputs/CreateProductInput";
import { TagEntity } from "../Tag/TagEntity";
import { adminIsLoggedIn } from "../../utils/adminIsLoggedIn";
import { Context } from "../../types";
import { UpdateProductInput } from "./inputs/UpdateProductInput";
import { ProductService } from "../../services/ProductService";

@Resolver()
export class ProductResolver {
  @Query(() => ProductGraphql, { nullable: true })
  async product(
    @Arg("productIdOrName", () => ID) productIdOrName: string
  ): Promise<ProductGraphql | null> {
    let product: ProductEntity | undefined;

    product = await ProductEntity.findOne(productIdOrName);

    if (!product) {
      product = await ProductEntity.findOne({
        where: { name: productIdOrName },
      });
    }

    if (!product) {
      return null;
    }

    const {
      id,
      category,
      price,
      imageUrl,
      name,
      createdAt,
      updatedAt,
      description,
    } = product;

    const tags = (await TagEntity.find({ productId: id })).map((tag) => ({
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
    };
  }

  @Query(() => [ProductGraphql])
  async products(): Promise<ProductGraphql[]> {
    const productEntities = await ProductEntity.find({});

    const productObjects: ProductGraphql[] = [];

    for (const productEntity of productEntities) {
      const productObject = await this.product(productEntity.id);
      if (productObject) {
        productObjects.push(productObject);
      }
    }

    return productObjects;
  }

  @Mutation(() => ProductGeneralResponse, { nullable: true })
  async createProduct(
    @Ctx() { req }: Context,
    @Arg("input", () => CreateProductInput)
    createProductInput: CreateProductInput
  ): Promise<ProductGeneralResponse> {
    if (!adminIsLoggedIn(req)) {
      return {
        error: {
          field: "",
          message: "You are not authorised to do that",
          ufm: "You are not authorised to do that",
        },
      };
    }

    return await ProductService.createProduct(createProductInput);
  }

  @Mutation(() => ProductGeneralResponse)
  async updateProduct(
    @Arg("input", () => UpdateProductInput)
    updateProductInput: UpdateProductInput
  ): Promise<ProductGeneralResponse> {
    return await ProductService.updateProduct(updateProductInput);
  }

  @Mutation(() => Boolean)
  async deleteProduct(
    @Arg("productIdOrName", () => String) productIdOrName: string
  ): Promise<Boolean> {
    try {
      await ProductEntity.delete({ id: productIdOrName }); // throws error if cannot delete
      return true;
    } catch (e) {
      try {
        await ProductEntity.delete({ name: productIdOrName });
        return true;
      } catch (e) {
        return false;
      }
    }
  }
}
