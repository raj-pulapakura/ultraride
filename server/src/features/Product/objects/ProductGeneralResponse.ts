import { Field, ObjectType } from "type-graphql";
import { Product } from "../Product";
import { FieldError } from "../../../objects/FieldError";

@ObjectType()
export class ProductGeneralResponse {
  @Field(() => Product, { nullable: true })
  product?: Product;

  @Field(() => FieldError, { nullable: true })
  error?: FieldError;
}
