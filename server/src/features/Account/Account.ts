import { Field, ObjectType } from "type-graphql";
import { Column, Entity, OneToMany } from "typeorm";
import { BaseModel } from "../../objects/BaseModel";
import { Purchase } from "../Purchase/Purchase";

@Entity()
@ObjectType()
export class Account extends BaseModel {
  @Column({ type: "varchar" })
  @Field(() => String)
  firstName!: string;

  @Column({ type: "varchar" })
  @Field(() => String)
  lastName!: string;

  @Column({ type: "varchar" })
  @Field(() => String)
  email!: string;

  @Column({ type: "varchar" })
  @Field(() => String)
  password!: string;

  @Column({ type: "varchar", default: "consumer" })
  @Field(() => String)
  role!: string;

  @OneToMany(() => Purchase, (purchase) => purchase.account)
  purchases!: Purchase[];
}
