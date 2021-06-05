import { MigrationInterface, QueryRunner } from 'typeorm'

export class loanContractCidNotNull1598300686671 implements MigrationInterface {
  name = 'loanContractCidNotNull1598300686671'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."loan_contract" ALTER COLUMN "cid" SET NOT NULL`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."loan_contract" ALTER COLUMN "cid" DROP NOT NULL`)
  }
}
