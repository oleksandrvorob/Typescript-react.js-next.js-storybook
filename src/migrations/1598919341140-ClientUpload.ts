import { MigrationInterface, QueryRunner } from 'typeorm'

export class ClientUpload1598919341140 implements MigrationInterface {
  name = 'ClientUpload1598919341140'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "public"."client_upload" ("id" SERIAL NOT NULL, "box_id" character varying NOT NULL, "name" character varying NOT NULL, "size" integer NOT NULL, "meta" jsonb NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, CONSTRAINT "UQ_8df43a2555b82afc32aa1e2f595" UNIQUE ("box_id"), CONSTRAINT "PK_0c21aa91fdaf8dc68ed704ff41d" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `ALTER TABLE "public"."client_upload" ADD CONSTRAINT "FK_f46f1008c4873afde0d94a576c7" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."client_upload" DROP CONSTRAINT "FK_f46f1008c4873afde0d94a576c7"`,
    )
  }
}
