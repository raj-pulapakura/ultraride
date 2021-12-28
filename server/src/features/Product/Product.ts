import { Field, Float, ID, Int, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseModel } from "../../objects/BaseModel";
import { Purchase } from "../Purchase/Purchase";

@Entity()
@ObjectType()
export class Product extends BaseModel {
  @Column({ type: "varchar", unique: true })
  @Field(() => String)
  name!: string;

  @Column({ type: "text" })
  @Field(() => String)
  description!: string;

  @Column({ type: "decimal" })
  @Field(() => Float)
  price!: number;

  @Column({ type: "varchar" })
  @Field(() => String)
  category!: string;

  @Column({ type: "varchar" })
  @Field(() => String)
  imageUrl!: string;

  @OneToMany(() => Purchase, (purchase) => purchase.product)
  purchases!: Purchase[];
}
