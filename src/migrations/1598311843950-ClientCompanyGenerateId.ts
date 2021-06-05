import { MigrationInterface, QueryRunner } from 'typeorm'

export class ClientCompanyGenerateId1598311843950 implements MigrationInterface {
  name = 'ClientCompanyGenerateId1598311843950'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."client_entity" DROP CONSTRAINT "FK_1ccf0611879e01e4088d413502c"`,
    )
    await queryRunner.query(
      `CREATE SEQUENCE "public"."client_company_id_seq" OWNED BY "public"."client_company"."id"`,
    )
    await queryRunner.query(
      `ALTER TABLE "public"."client_company" ALTER COLUMN "id" SET DEFAULT nextval('public.client_company_id_seq')`,
    )
    await queryRunner.query(
      `ALTER TABLE "public"."client_entity" ADD CONSTRAINT "FK_1ccf0611879e01e4088d413502c" FOREIGN KEY ("categoryId") REFERENCES "public"."client_company"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."client_entity" DROP CONSTRAINT "FK_1ccf0611879e01e4088d413502c"`,
    )
    await queryRunner.query(`ALTER TABLE "public"."client_company" ALTER COLUMN "id" DROP DEFAULT`)
    await queryRunner.query(`DROP SEQUENCE "public"."client_company_id_seq"`)
    await queryRunner.query(
      `ALTER TABLE "public"."client_entity" ADD CONSTRAINT "FK_1ccf0611879e01e4088d413502c" FOREIGN KEY ("categoryId") REFERENCES "public"."client_company"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
  }
}
