import { Field, Float, InputType } from "type-graphql";

@InputType()
export class CreateProductInput {
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

  @Field(() => [String])
  tags!: string[];

  @Field(() => String)
  brand!: string;
}
