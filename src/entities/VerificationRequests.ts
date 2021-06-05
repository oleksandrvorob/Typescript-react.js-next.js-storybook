import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

// @Index("UQ_77287cef70a4627091ae6d19c4d", ["token"], { unique: true })
@Entity("verification_requests", { schema: "public" })
export class VerificationRequests {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "identifier" })
  identifier: string;

  @Column("character varying", { name: "token", unique: true })
  token: string;

  @Column("timestamp with time zone", { name: "expires" })
  expires: Date;

  @Column("timestamp with time zone", {
    name: "created_at",
    default: () => "now()",
  })
  createdAt: Date;

  @Column("timestamp with time zone", {
    name: "updated_at",
    default: () => "now()",
  })
  updatedAt: Date;
}
