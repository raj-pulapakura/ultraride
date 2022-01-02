import { Column, Entity, ManyToOne } from "typeorm";
import { AccountEntity } from "../Account/AccountEntity";
import { BaseModel } from "../../objects/BaseModel";
import { ProductEntity } from "../Product/ProductEntity";

@Entity("purchase")
export class PurchaseEntity extends BaseModel {
  @Column({ type: "varchar" })
  accountId!: string;

  @Column({ type: "varchar" })
  productId!: string;

  @ManyToOne(() => AccountEntity, (account) => account.purchases)
  account!: AccountEntity;

  @ManyToOne(() => ProductEntity, (product) => product.purchases)
  product!: ProductEntity;

  @Column({ type: "int" })
  quantity!: number;

  @Column({ type: "int" })
  price!: number;

  @Column({ type: "int" })
  total!: number;
}
