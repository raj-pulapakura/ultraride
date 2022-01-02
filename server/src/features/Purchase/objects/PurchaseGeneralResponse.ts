import { Field, ObjectType } from "type-graphql";
import { PurchaseGraphql } from "../PurchaseGraphql";
import { FieldError } from "../../../objects/FieldError";

@ObjectType()
export class PurchaseGeneralResponse {
  @Field(() => PurchaseGraphql, { nullable: true })
  purchase?: PurchaseGraphql;

  @Field(() => FieldError, { nullable: true })
  error?: FieldError;
}
