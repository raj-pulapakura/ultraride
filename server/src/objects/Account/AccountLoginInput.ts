import { Field, InputType } from "type-graphql";

@InputType()
export class AccountLoginInput {
  @Field(() => String)
  email!: string;

  @Field(() => String)
  password!: string;
}
