import { MigrationInterface, QueryRunner } from 'typeorm'

export class ClientCompanyUniqueCompanyName1598314692348 implements MigrationInterface {
  name = 'ClientCompanyUniqueCompanyName1598314692348'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."client_company" ADD CONSTRAINT "UQ_a1d07938580ab88ee6da4fd69fe" UNIQUE ("company_name")`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."client_company" DROP CONSTRAINT "UQ_a1d07938580ab88ee6da4fd69fe"`,
    )
  }
}
