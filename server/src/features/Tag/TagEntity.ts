import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseModel } from "../../objects/BaseModel";
import { ProductEntity } from "../Product/ProductEntity";

@Entity("tag")
export class TagEntity extends BaseModel {
  @Column({ type: "string" })
  productId!: string;

  @ManyToOne(() => ProductEntity, (product) => product.tags, {
    onDelete: "CASCADE",
  })
  product!: ProductEntity;

  @Column({ type: "varchar" })
  text!: string;
}
