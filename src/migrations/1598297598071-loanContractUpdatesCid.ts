import { MigrationInterface, QueryRunner } from 'typeorm'

export class loanContractUpdatesCid1598297598071 implements MigrationInterface {
  name = 'loanContractUpdatesCid1598297598071'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."loan_contract" DROP CONSTRAINT "FK_99ed9e6b6c4aa35df0f8c2bf978"`,
    )
    await queryRunner.query(`ALTER TABLE "public"."loan_contract" ADD "cid" integer`)
    await queryRunner.query(
      `ALTER TABLE "public"."loan_contract" ADD CONSTRAINT "FK_6deef502d2b4e26b136249a4d53" FOREIGN KEY ("address_id") REFERENCES "public"."address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."loan_contract" DROP CONSTRAINT "FK_6deef502d2b4e26b136249a4d53"`,
    )
    await queryRunner.query(`ALTER TABLE "public"."loan_contract" DROP COLUMN "cid"`)
    await queryRunner.query(
      `ALTER TABLE "public"."loan_contract" ADD CONSTRAINT "FK_99ed9e6b6c4aa35df0f8c2bf978" FOREIGN KEY ("address_id") REFERENCES "public"."address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }
}
