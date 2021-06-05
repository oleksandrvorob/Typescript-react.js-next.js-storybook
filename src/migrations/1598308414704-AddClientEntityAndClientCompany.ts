import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddClientEntityAndClientCompany1598308414704 implements MigrationInterface {
  name = 'AddClientEntityAndClientCompany1598308414704'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "public"."client_entity" ("id" integer NOT NULL, "name" text NOT NULL, "categoryId" integer, CONSTRAINT "PK_eec1af30955227ed53c97a5669b" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "public"."client_company" ("id" integer NOT NULL, "company_name" text NOT NULL, "contact_name" text, "contact_email" text, CONSTRAINT "PK_177dd19632e4c3529fa310a3ef4" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `ALTER TABLE "public"."client_entity" ADD CONSTRAINT "FK_1ccf0611879e01e4088d413502c" FOREIGN KEY ("categoryId") REFERENCES "public"."client_company"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."client_entity" DROP CONSTRAINT "FK_1ccf0611879e01e4088d413502c"`,
    )
    await queryRunner.query(`DROP TABLE "public"."client_company"`)
    await queryRunner.query(`DROP TABLE "public"."client_entity"`)
  }
}
