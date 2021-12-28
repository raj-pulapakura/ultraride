import { Arg, Query, Resolver, ID, Mutation } from "type-graphql";
import { Purchase } from "./Purchase";
import { PurchaseGeneralResponse } from "./objects/PurchaseGeneralResponse";
import { CreatePurchaseInput } from "./inputs/CreatePurchaseInput";
import { PurchaseProductsInput } from "./inputs/PurchaseProductsInput";
import { Product } from "../Product/Product";

@Resolver()
export class PurchaseResolver {
  @Query(() => [Purchase])
  getPurchases(): Promise<Purchase[]> {
    return Purchase.find({});
  }

  @Query(() => Purchase, { nullable: true })
  async getPurchase(
    @Arg("purchaseId", () => ID) purchaseId: string
  ): Promise<Purchase | null> {
    const purchase = await Purchase.findOne(purchaseId);
    return purchase ? purchase : null;
  }

  @Mutation(() => PurchaseGeneralResponse, { nullable: true })
  async createPurchase(
    @Arg("input", () => CreatePurchaseInput)
    createPurchaseInput: CreatePurchaseInput
  ): Promise<PurchaseGeneralResponse> {
    const { accountId, productId, quantity, price, total } =
      createPurchaseInput;

    const newPurchase = await Purchase.create({
      accountId,
      productId,
      quantity,
      price,
      total,
    }).save();
    return {
      purchase: newPurchase,
    };
  }

  @Mutation(() => Boolean)
  async purchaseProducts(
    @Arg("input", () => PurchaseProductsInput)
    purchaseProductsInput: PurchaseProductsInput
  ): Promise<Boolean> {
    const { purchaseListings, accountId } = purchaseProductsInput;

    purchaseListings.forEach(async ({ productId, quantity }) => {
      const product = await Product.findOne(productId);
      if (!product) {
        return;
      }
      Purchase.create({
        accountId,
        productId,
        quantity,
        price: product.price,
        total: quantity * product.price,
      }).save();
    });

    return true;
  }
}
