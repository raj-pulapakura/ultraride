import { Field, ObjectType } from "type-graphql";
import { Product } from "../../Product/Product";
import { Purchase } from "../Purchase";
import { FieldError } from "../../../objects/FieldError";

@ObjectType()
export class PurchaseGeneralResponse {
  @Field(() => Purchase, { nullable: true })
  purchase?: Purchase;

  @Field(() => FieldError, { nullable: true })
  error?: FieldError;
}
