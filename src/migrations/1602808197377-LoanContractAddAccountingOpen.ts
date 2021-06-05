import { MigrationInterface, QueryRunner } from "typeorm";

export class LoanContractAddAccountingOpen1602808197377 implements MigrationInterface {
  name = 'LoanContractAddAccountingOpen1602808197377'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."loan_contract" ADD "accounting_open" boolean NOT NULL DEFAULT false`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."loan_contract" DROP COLUMN "accounting_open"`);
  }

}
