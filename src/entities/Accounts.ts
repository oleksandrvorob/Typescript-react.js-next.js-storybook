import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

// @Index("UQ_95843cea26fc65b1a9d9b6e1d2b", ["compoundId"], { unique: true })
@Index("providerAccountId", ["providerAccountId"], {})
@Index("providerId", ["providerId"], {})
@Index("userId", ["userId"], {})
@Entity("accounts", { schema: "public" })
export class Accounts {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "compound_id", unique: true })
  compoundId: string;

  @Column("integer", { name: "user_id" })
  userId: number;

  @Column("character varying", { name: "provider_type" })
  providerType: string;

  @Column("character varying", { name: "provider_id" })
  providerId: string;

  @Column("character varying", { name: "provider_account_id" })
  providerAccountId: string;

  @Column("text", { name: "refresh_token", nullable: true })
  refreshToken: string | null;

  @Column("text", { name: "access_token", nullable: true })
  accessToken: string | null;

  @Column("timestamp with time zone", {
    name: "access_token_expires",
    nullable: true,
  })
  accessTokenExpires: Date | null;

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
