import { Field, ID, Int, ObjectType } from "type-graphql";
import { BaseGraphql } from "../../objects/BaseGraphql";

@ObjectType()
export class PurchaseGraphql extends BaseGraphql {
  @Field(() => ID)
  accountId!: string;

  @Field(() => ID)
  productId!: string;

  @Field(() => Int)
  quantity!: number;

  @Field(() => Int)
  price!: number;

  @Field(() => Int)
  total!: number;
}
