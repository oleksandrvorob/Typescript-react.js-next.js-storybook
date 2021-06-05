import { MigrationInterface, QueryRunner } from "typeorm";

export class DrawRequestReimbursementRollUpToLoanContract1602794787428 implements MigrationInterface {
  name = 'DrawRequestReimbursementRollUpToLoanContract1602794787428'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."draw_request_reimbursement" DROP CONSTRAINT "FK_81879c03e007a41610731d69b13"`);
    await queryRunner.query(`ALTER TABLE "public"."draw_request_reimbursement" RENAME COLUMN "draw_request_id" TO "loan_id"`);
    await queryRunner.query(`ALTER TABLE "public"."draw_request_reimbursement" DROP COLUMN "loan_id"`);
    await queryRunner.query(`ALTER TABLE "public"."draw_request_reimbursement" ADD "loan_id" integer`);
    await queryRunner.query(`ALTER TABLE "public"."draw_request_reimbursement" ADD CONSTRAINT "FK_6760d4766f0289f1cfe59479799" FOREIGN KEY ("loan_id") REFERENCES "public"."loan_contract"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."draw_request_reimbursement" DROP CONSTRAINT "FK_6760d4766f0289f1cfe59479799"`);
    await queryRunner.query(`ALTER TABLE "public"."draw_request_reimbursement" DROP COLUMN "loan_id"`);
    await queryRunner.query(`ALTER TABLE "public"."draw_request_reimbursement" ADD "loan_id" uuid`);
    await queryRunner.query(`ALTER TABLE "public"."draw_request_reimbursement" RENAME COLUMN "loan_id" TO "draw_request_id"`);
    await queryRunner.query(`ALTER TABLE "public"."draw_request_reimbursement" ADD CONSTRAINT "FK_81879c03e007a41610731d69b13" FOREIGN KEY ("draw_request_id") REFERENCES "public"."draw_request"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

}
