import { Field, ObjectType } from "type-graphql";
import { Column, Entity, OneToMany } from "typeorm";
import { BaseModel } from "../objects/BaseModel";
import { Product } from "./Product";

@Entity()
@ObjectType()
export class Category extends BaseModel {
  @Column({ type: "varchar", unique: true })
  @Field(() => String)
  name!: string;

  @OneToMany(() => Product, (product) => product.category)
  products!: Product[];
}
