import { MigrationInterface, QueryRunner } from 'typeorm'

export class ClientEntityFixCompanyIdName1598315673641 implements MigrationInterface {
  name = 'ClientEntityFixCompanyIdName1598315673641'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."client_entity" DROP CONSTRAINT "FK_1ccf0611879e01e4088d413502c"`,
    )
    await queryRunner.query(
      `ALTER TABLE "public"."client_entity" RENAME COLUMN "categoryId" TO "company_id"`,
    )
    await queryRunner.query(
      `ALTER TABLE "public"."client_entity" ADD CONSTRAINT "FK_323057802f1b15ebe08535c0682" FOREIGN KEY ("company_id") REFERENCES "public"."client_company"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."client_entity" DROP CONSTRAINT "FK_323057802f1b15ebe08535c0682"`,
    )
    await queryRunner.query(
      `ALTER TABLE "public"."client_entity" RENAME COLUMN "company_id" TO "categoryId"`,
    )
    await queryRunner.query(
      `ALTER TABLE "public"."client_entity" ADD CONSTRAINT "FK_1ccf0611879e01e4088d413502c" FOREIGN KEY ("categoryId") REFERENCES "public"."client_company"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
  }
}
