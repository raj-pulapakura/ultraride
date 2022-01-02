import { Arg, Query, Resolver, ID, Mutation } from "type-graphql";
import { PurchaseEntity } from "./PurchaseEntity";
import { PurchaseGraphql } from "./PurchaseGraphql";

import { PurchaseGeneralResponse } from "./objects/PurchaseGeneralResponse";
import { CreatePurchaseInput } from "./inputs/CreatePurchaseInput";
import { PurchaseProductsInput } from "./inputs/PurchaseProductsInput";
import { ProductEntity } from "../Product/ProductEntity";

@Resolver()
export class PurchaseResolver {
  @Query(() => [PurchaseGraphql])
  getPurchases(): Promise<PurchaseGraphql[]> {
    return PurchaseEntity.find({});
  }

  @Query(() => PurchaseGraphql, { nullable: true })
  async getPurchase(
    @Arg("purchaseId", () => ID) purchaseId: string
  ): Promise<PurchaseGraphql | null> {
    const purchase = await PurchaseEntity.findOne(purchaseId);
    return purchase ? purchase : null;
  }

  @Mutation(() => PurchaseGeneralResponse, { nullable: true })
  async createPurchase(
    @Arg("input", () => CreatePurchaseInput)
    createPurchaseInput: CreatePurchaseInput
  ): Promise<PurchaseGeneralResponse> {
    const { accountId, productId, quantity, price, total } =
      createPurchaseInput;

    const newPurchase = await PurchaseEntity.create({
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
      const product = await ProductEntity.findOne(productId);
      if (!product) {
        return;
      }
      PurchaseEntity.create({
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
