import {MigrationInterface, QueryRunner} from "typeorm";

export class DrawRequestAddReimbursementFields1599687933281 implements MigrationInterface {
    name = 'DrawRequestAddReimbursementFields1599687933281'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."draw_request" ADD "reimbursed_amount" money`);
        await queryRunner.query(`ALTER TABLE "public"."draw_request" ADD "reimbursed_date" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TYPE "public"."draw_request_status_enum" RENAME TO "draw_request_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "public"."draw_request" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`CREATE TYPE "public"."draw_request_status_enum" AS ENUM('held', 'new', 'inspection ordered', 'inspection approved', 'approved', 'funded', 'reimbursed')`);
        await queryRunner.query(`ALTER TABLE "public"."draw_request" ALTER COLUMN "status" TYPE "public"."draw_request_status_enum" USING "status"::"text"::"public"."draw_request_status_enum"`);
        await queryRunner.query(`ALTER TABLE "public"."draw_request" ALTER COLUMN "status" SET DEFAULT 'new'`);
        await queryRunner.query(`DROP TYPE "public"."draw_request_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "public"."draw_request" ADD CONSTRAINT "FK_361da57fe80dd5f4fd109e152be" FOREIGN KEY ("loan_id") REFERENCES "public"."loan_contract"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`ALTER TABLE "public"."draw_request" DROP COLUMN "reimbursed_date"`);
      await queryRunner.query(`ALTER TABLE "public"."draw_request" DROP COLUMN "reimbursed_amount"`);
      await queryRunner.query(`CREATE TYPE "public"."draw_request_status_enum_old" AS ENUM('held', 'new', 'inspection ordered', 'inspection approved', 'approved', 'funded')`);
      await queryRunner.query(`ALTER TABLE "public"."draw_request" ALTER COLUMN "status" DROP DEFAULT`);
      await queryRunner.query(`ALTER TABLE "public"."draw_request" ALTER COLUMN "status" TYPE "public"."draw_request_status_enum_old" USING "status"::"text"::"public"."draw_request_status_enum_old"`);
      await queryRunner.query(`ALTER TABLE "public"."draw_request" ALTER COLUMN "status" SET DEFAULT 'new'`);
      await queryRunner.query(`DROP TYPE "public"."draw_request_status_enum"`);
      await queryRunner.query(`ALTER TYPE "public"."draw_request_status_enum_old" RENAME TO  "draw_request_status_enum"`);
      await queryRunner.query(`ALTER TABLE "public"."draw_request" DROP CONSTRAINT "FK_361da57fe80dd5f4fd109e152be"`);
    }

}
