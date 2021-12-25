import { Arg, Query, Resolver, ID, Mutation } from "type-graphql";
import { Product } from "../entities/Product";
import { ProductResponse } from "../objects/Product/ProductResponse";
import { DummyResponse } from "../objects/DummyResponse";
import { hash } from "argon2";
import { ProductInput } from "../objects/Product/ProductInput";

@Resolver()
export class ProductResolver {
  @Query(() => [Product])
  products(): Promise<Product[]> {
    return Product.find({});
  }

  @Query(() => Product, { nullable: true })
  async product(
    @Arg("productIdOrName", () => ID) productIdOrName: string
  ): Promise<Product | null> {
    const productById = await Product.findOne(productIdOrName);
    if (productById) return productById;

    const productByName = await Product.findOne({
      where: { name: productIdOrName },
    });
    if (productByName) return productByName;

    return null;
  }

  @Mutation(() => ProductResponse, { nullable: true })
  async createProduct(
    @Arg("input", () => ProductInput)
    createProductInput: ProductInput
  ): Promise<ProductResponse> {
    const { name, description, price, categoryId } = createProductInput;

    const productAlreadyExists = await Product.findOne({ where: { name } });
    if (productAlreadyExists) {
      return {
        error: {
          field: "name",
          message: "a product with that name already exists",
          ufm: "A product with that name already exists. Please enter a different one.",
        },
      };
    }

    const newProduct = await Product.create({
      name,
      description,
      price,
      categoryId,
    }).save();
    return {
      product: newProduct,
    };
  }

  // @Mutation(() => ProductResponse)
  // async deleteProduct(
  //   @Arg("productIdOrName", () => String) productIdOrName: string
  // ): Promise<ProductResponse> {
  //   const product = await Product.delete({ id: productIdOrName });
  // }
}
