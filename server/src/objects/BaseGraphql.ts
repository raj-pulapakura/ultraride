import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export abstract class BaseGraphql {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  createdAt!: Date;

  @Field(() => String)
  updatedAt!: Date;
}
