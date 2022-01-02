import { Column, Entity, OneToMany } from "typeorm";
import { BaseModel } from "../../objects/BaseModel";
import { PurchaseEntity } from "../Purchase/PurchaseEntity";

@Entity("account")
export class AccountEntity extends BaseModel {
  @Column({ type: "varchar" })
  firstName!: string;

  @Column({ type: "varchar" })
  lastName!: string;

  @Column({ type: "varchar" })
  email!: string;

  @Column({ type: "varchar" })
  password!: string;

  @Column({ type: "varchar", default: "consumer" })
  role!: string;

  @OneToMany(() => PurchaseEntity, (purchase) => purchase.account)
  purchases!: PurchaseEntity[];
}
