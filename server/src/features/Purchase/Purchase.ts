import { Field, ID, Int, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne } from "typeorm";
import { Account } from "../Account/Account";
import { BaseModel } from "../../objects/BaseModel";
import { Product } from "../Product/Product";

@Entity()
@ObjectType()
export class Purchase extends BaseModel {
  @Field(() => ID)
  @Column({ type: "varchar" })
  accountId!: string;

  @Field(() => ID)
  @Column({ type: "varchar" })
  productId!: string;

  @ManyToOne(() => Account, (account) => account.purchases)
  account!: Account;

  @ManyToOne(() => Product, (product) => product.purchases)
  product!: Product;

  @Field(() => Int)
  @Column({ type: "int" })
  quantity!: number;

  @Field(() => Int)
  @Column({ type: "int" })
  price!: number;

  @Field(() => Int)
  @Column({ type: "int" })
  total!: number;
}
