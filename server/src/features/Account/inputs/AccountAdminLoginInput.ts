import { Field, ID, InputType } from "type-graphql";

@InputType()
export class AccountAdminLoginInput {
  @Field(() => ID)
  adminId!: string;

  @Field(() => String)
  adminPassword!: string;
}
