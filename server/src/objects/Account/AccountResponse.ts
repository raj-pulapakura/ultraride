import { Field, ObjectType } from "type-graphql";
import { Account } from "../../entities/Account";
import { FieldError } from "../FieldError";

@ObjectType()
export class AccountResponse {
  @Field(() => Account, { nullable: true })
  account?: Account;

  @Field(() => FieldError, { nullable: true })
  error?: FieldError;
}
