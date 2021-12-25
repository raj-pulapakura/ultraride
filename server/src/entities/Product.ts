import { Field, Float, ID, Int, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseModel } from "../objects/BaseModel";
import { Category } from "./Category";
import { Purchase } from "./Purchase";

@Entity()
@ObjectType()
export class Product extends BaseModel {
  @Column({ type: "varchar", unique: true })
  @Field(() => String)
  name!: string;

  @Column({ type: "varchar" })
  @Field(() => String)
  description!: string;

  @Column({ type: "decimal" })
  @Field(() => Float)
  price!: number;

  @Column({ type: "varchar" })
  @Field(() => ID)
  categoryId!: string;

  @ManyToOne(() => Category, (category) => category.products)
  category!: Category;

  @OneToMany(() => Purchase, (purchase) => purchase.product)
  purchases!: Purchase[];
}
