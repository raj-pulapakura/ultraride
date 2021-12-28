import { Field, ObjectType } from "type-graphql";
import { Account } from "../Account";
import { FieldError } from "../../../objects/FieldError";

@ObjectType()
export class AccountGeneralResponse {
  @Field(() => Account, { nullable: true })
  account?: Account;

  @Field(() => FieldError, { nullable: true })
  error?: FieldError;
}
