import { Field, ID, ObjectType } from "type-graphql";
import { BaseGraphql } from "../../objects/BaseGraphql";

@ObjectType()
export class TagGraphql extends BaseGraphql {
  @Field(() => ID)
  productId!: string;

  @Field(() => String)
  text!: string;
}
