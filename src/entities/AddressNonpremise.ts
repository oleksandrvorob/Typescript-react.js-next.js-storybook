import { Column, Entity, Index } from "typeorm";

// @Index("address_nonpremise_pkey", ["address"], { unique: true })
@Entity("address_nonpremise", { schema: "public" })
export class AddressNonpremise {
  @Column("text", { primary: true, name: "address" })
  address: string;
}
