import { Field, ID, InputType } from "type-graphql";
import { PurchaseListingInput } from "./PurchaseListingInput";

@InputType()
export class PurchaseProductsInput {
  @Field(() => [PurchaseListingInput])
  purchaseListings!: PurchaseListingInput[];

  @Field(() => ID)
  accountId!: string;
}
