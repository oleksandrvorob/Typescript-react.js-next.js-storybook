import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

// @Index("fci_changes_pkey", ["id"], { unique: true })
@Entity("fci_changes", { schema: "public" })
export class FciChanges {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "loan_id" })
  loanId: number;

  @Column("character varying", { name: "key", length: 40 })
  key: string;

  @Column("text", { name: "value", nullable: true })
  value: string | null;

  @Column("timestamp without time zone", { name: "changed_on" })
  changedOn: Date;
}
