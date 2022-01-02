import { Field, ObjectType } from "type-graphql";
import { ProductGraphql } from "../ProductGraphql";
import { FieldError } from "../../../objects/FieldError";

@ObjectType()
export class ProductGeneralResponse {
  @Field(() => ProductGraphql, { nullable: true })
  product?: ProductGraphql;

  @Field(() => FieldError, { nullable: true })
  error?: FieldError;
}
