import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class DummyResponse {
  @Field(() => String)
  message!: string;
}
