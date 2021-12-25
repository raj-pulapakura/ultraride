import { Field, ObjectType } from "type-graphql";
import { Product } from "../../entities/Product";
import { FieldError } from "../FieldError";

@ObjectType()
export class ProductResponse {
  @Field(() => Product, { nullable: true })
  product?: Product;

  @Field(() => FieldError, { nullable: true })
  error?: FieldError;
}
