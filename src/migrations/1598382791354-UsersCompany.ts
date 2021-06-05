import { MigrationInterface, QueryRunner } from 'typeorm'

export class UsersCompany1598382791354 implements MigrationInterface {
  name = 'UsersCompany1598382791354'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "public"."users_company" ("_id" SERIAL NOT NULL, "user_id" integer, "company_id" integer, CONSTRAINT "REL_cee87e9f98046f3191f005d7ad" UNIQUE ("user_id"), CONSTRAINT "PK_24a794456ceb3fa61fe109ba0e7" PRIMARY KEY ("_id"))`,
    )
    await queryRunner.query(
      `ALTER TABLE "public"."users_company" ADD CONSTRAINT "FK_cee87e9f98046f3191f005d7adf" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "public"."users_company" ADD CONSTRAINT "FK_6e7c4f95e5b708f256852365540" FOREIGN KEY ("company_id") REFERENCES "public"."client_company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."users_company" DROP CONSTRAINT "FK_6e7c4f95e5b708f256852365540"`,
    )
    await queryRunner.query(
      `ALTER TABLE "public"."users_company" DROP CONSTRAINT "FK_cee87e9f98046f3191f005d7adf"`,
    )
    await queryRunner.query(`DROP TABLE "public"."users_company"`)
  }
}
