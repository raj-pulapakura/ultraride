import { Arg, Query, Resolver, ID, Mutation } from "type-graphql";
import { Product } from "./Product";
import { ProductGeneralResponse } from "./objects/ProductGeneralResponse";
import { CreateProductInput } from "./inputs/CreateProductInput";

@Resolver()
export class ProductResolver {
  @Query(() => [Product])
  getProducts(): Promise<Product[]> {
    return Product.find({});
  }

  @Query(() => Product, { nullable: true })
  async getProduct(
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

  @Mutation(() => ProductGeneralResponse, { nullable: true })
  async createProduct(
    @Arg("input", () => CreateProductInput)
    createProductInput: CreateProductInput
  ): Promise<ProductGeneralResponse> {
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
