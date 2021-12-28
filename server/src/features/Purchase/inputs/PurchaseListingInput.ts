import { Field, ID, InputType, Int, ObjectType } from "type-graphql";

@InputType()
export class PurchaseListingInput {
  @Field(() => ID)
  productId!: string;

  @Field(() => Int)
  quantity!: number;
}
