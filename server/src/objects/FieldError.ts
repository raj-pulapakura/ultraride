import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class FieldError {
  @Field(() => String)
  field!: string;

  @Field(() => String)
  message!: string;

  @Field(() => String)
  ufm!: String; // user friendly message
}
