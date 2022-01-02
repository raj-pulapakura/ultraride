import { Field, Float, ID, Int, ObjectType } from "type-graphql";
import { BaseGraphql } from "../../objects/BaseGraphql";
import { BaseModel } from "../../objects/BaseModel";
import { TagGraphql } from "../Tag/TagGraphql";

@ObjectType()
export class ProductGraphql extends BaseGraphql {
  @Field(() => String)
  name!: string;

  @Field(() => String)
  description!: string;

  @Field(() => Float)
  price!: number;

  @Field(() => String)
  category!: string;

  @Field(() => String)
  imageUrl!: string;

  @Field(() => [TagGraphql])
  tags!: TagGraphql[];
}
