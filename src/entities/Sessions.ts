import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

// @Index("UQ_b02a7acc05fe8194bed8433cf25", ["accessToken"], { unique: true })
// @Index("UQ_f10db2949bbea55b44f31108e1a", ["sessionToken"], { unique: true })
@Entity("sessions", { schema: "public" })
export class Sessions {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "user_id" })
  userId: number;

  @Column("timestamp with time zone", { name: "expires" })
  expires: Date;

  @Column("character varying", { name: "session_token", unique: true })
  sessionToken: string;

  @Column("character varying", { name: "access_token", unique: true })
  accessToken: string;

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
