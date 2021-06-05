import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

// @Index("inspection_vendor_pkey", ["id"], { unique: true })
// @Index("inspection_vendor_name_key", ["name"], { unique: true })
@Entity("inspection_vendor", { schema: "public" })
export class InspectionVendor {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("text", { name: "name", unique: true })
  name: string;
}
