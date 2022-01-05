import { Field, ObjectType } from "type-graphql";
import { BaseGraphql } from "../../objects/BaseGraphql";

@ObjectType()
export class AccountGraphql extends BaseGraphql {
  @Field(() => String)
  firstName!: string;

  @Field(() => String)
  lastName!: string;

  @Field(() => String)
  email!: string;

  @Field(() => String)
  role!: string;
}
