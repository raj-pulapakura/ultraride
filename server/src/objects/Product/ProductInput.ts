import { Field, Float, ID, InputType } from "type-graphql";

@InputType()
export class ProductInput {
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
}
