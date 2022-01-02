import { Arg, Query, Resolver, ID, Mutation } from "type-graphql";
import { ProductEntity } from "./ProductEntity";
import { ProductGraphql } from "./ProductGraphql";
import { ProductGeneralResponse } from "./objects/ProductGeneralResponse";
import { CreateProductInput } from "./inputs/CreateProductInput";
import { TagEntity } from "../Tag/TagEntity";

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
    @Arg("input", () => CreateProductInput)
    createProductInput: CreateProductInput
  ): Promise<ProductGeneralResponse> {
    const { name, description, price, category, imageUrl, tags } =
      createProductInput;

    const productAlreadyExists = await ProductEntity.findOne({
      where: { name },
    });
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

    tags.forEach(
      async (tag) =>
        await TagEntity.create({ productId: newProduct.id, text: tag }).save()
    );

    return {
      product: newProduct,
    };
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
