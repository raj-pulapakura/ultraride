import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseModel } from "../../objects/BaseModel";
import { PurchaseEntity } from "../Purchase/PurchaseEntity";
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

  @Column({ type: "varchar" })
  imageUrl!: string;

  @OneToMany(() => PurchaseEntity, (purchase) => purchase.product)
  purchases!: PurchaseEntity[];

  @OneToMany(() => TagEntity, (tag) => tag.product)
  tags!: TagEntity[];
}
