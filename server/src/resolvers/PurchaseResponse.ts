import { Arg, Query, Resolver, ID, Mutation } from "type-graphql";
import { Purchase } from "../entities/Purchase";
import { PurchaseResponse } from "../objects/Purchase/PurchaseResponse";
import { PurchaseInput } from "../objects/Purchase/PurchaseInput";

@Resolver()
export class PurchaseResolver {
  @Query(() => [Purchase])
  purchases(): Promise<Purchase[]> {
    return Purchase.find({});
  }

  @Query(() => Purchase, { nullable: true })
  async purchase(
    @Arg("purchaseId", () => ID) purchaseId: string
  ): Promise<Purchase | null> {
    const purchase = await Purchase.findOne(purchaseId);
    return purchase ? purchase : null;
  }

  @Mutation(() => PurchaseResponse, { nullable: true })
  async createPurchase(
    @Arg("input", () => PurchaseInput)
    createPurchaseInput: PurchaseInput
  ): Promise<PurchaseResponse> {
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
}
