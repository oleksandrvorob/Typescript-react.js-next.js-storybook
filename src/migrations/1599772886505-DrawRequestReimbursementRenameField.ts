import {MigrationInterface, QueryRunner} from "typeorm";

export class DrawRequestReimbursementRenameField1599772886505 implements MigrationInterface {
    name = 'DrawRequestReimbursementRenameField1599772886505'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."draw_request_reimbursement" RENAME COLUMN "reimbursedDate" TO "reimbursed_date"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."draw_request_reimbursement" RENAME COLUMN "reimbursed_date" TO "reimbursedDate"`);
    }

}
