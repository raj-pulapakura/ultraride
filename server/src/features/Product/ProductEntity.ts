import { Column, Entity, OneToMany } from "typeorm";
import { BaseModel } from "../../objects/BaseModel";
import { TagEntity } from "../Tag/TagEntity";

@Entity("product")
export class ProductEntity extends BaseModel {
  @Column({ type: "varchar", unique: true })
  name!: string;

  @Column({ type: "text" })
  description!: string;

  @Column({ type: "decimal" })
  price!: number;

  @Column({ type: "varchar" })
  category!: string;

  @Column({ type: "text" })
  imageUrl!: string;

  @Column({ type: "varchar" })
  brand!: string;

  @OneToMany(() => TagEntity, (tag) => tag.product)
  tags!: TagEntity[];
}
