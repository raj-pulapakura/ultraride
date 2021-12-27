import { Arg, Query, Resolver, ID, Mutation } from "type-graphql";
import { Product } from "../entities/Product";
import { ProductResponse } from "../objects/Product/ProductResponse";
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
    const { name, description, price, category, imageUrl } = createProductInput;

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
      category,
      imageUrl,
    }).save();
    return {
      product: newProduct,
    };
  }

  @Mutation(() => Boolean)
  async deleteProduct(
    @Arg("productIdOrName", () => String) productIdOrName: string
  ): Promise<Boolean> {
    try {
      await Product.delete({ id: productIdOrName }); // throws error if cannot delete
      return true;
    } catch (e) {
      try {
        await Product.delete({ name: productIdOrName });
        return true;
      } catch (e) {
        return false;
      }
    }
  }
}
