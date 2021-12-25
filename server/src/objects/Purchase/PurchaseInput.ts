import { Field, Float, ID, InputType, Int } from "type-graphql";

@InputType()
export class PurchaseInput {
  @Field(() => ID)
  accountId!: string;

  @Field(() => ID)
  productId!: string;

  @Field(() => Int)
  quantity!: number;

  @Field(() => Float)
  price!: number;

  @Field(() => Float)
  total!: number;
}
