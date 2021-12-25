import { Field, ObjectType } from "type-graphql";
import { Product } from "../../entities/Product";
import { Purchase } from "../../entities/Purchase";
import { FieldError } from "../FieldError";

@ObjectType()
export class PurchaseResponse {
  @Field(() => Purchase, { nullable: true })
  purchase?: Purchase;

  @Field(() => FieldError, { nullable: true })
  error?: FieldError;
}
