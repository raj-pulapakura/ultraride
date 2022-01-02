import { Field, ObjectType } from "type-graphql";
import { AccountGraphql } from "../AccountGraphql";
import { FieldError } from "../../../objects/FieldError";

@ObjectType()
export class AccountGeneralResponse {
  @Field(() => AccountGraphql, { nullable: true })
  account?: AccountGraphql;

  @Field(() => FieldError, { nullable: true })
  error?: FieldError;
}
