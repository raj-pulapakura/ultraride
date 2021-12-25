import { Field, ObjectType } from "type-graphql";
import { Category } from "../../entities/Category";
import { FieldError } from "../FieldError";

@ObjectType()
export class CategoryResponse {
  @Field(() => Category, { nullable: true })
  category?: Category;

  @Field(() => FieldError, { nullable: true })
  error?: FieldError;
}
