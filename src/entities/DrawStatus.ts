import { Column, Entity, Index } from "typeorm";

// @Index("draw_status_pkey", ["id"], { unique: true })
@Entity("draw_status", { schema: "public" })
export class DrawStatus {
  @Column("integer", { primary: true, name: "id" })
  id: number;

  @Column("money", { name: "approved_holdback", nullable: true })
  approvedHoldback: string | null;

  @Column("money", { name: "rehab_budget", nullable: true })
  rehabBudget: string | null;

  @Column("numeric", { name: "approved_holdback_percentage", nullable: true })
  approvedHoldbackPercentage: string | null;

  @Column("money", { name: "total_holdback_disbursed", nullable: true })
  totalHoldbackDisbursed: string | null;

  @Column("numeric", { name: "holdback_shortfall", nullable: true })
  holdbackShortfall: string | null;
}
