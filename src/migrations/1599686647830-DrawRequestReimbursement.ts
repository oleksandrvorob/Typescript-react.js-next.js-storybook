import {MigrationInterface, QueryRunner} from "typeorm";

export class DrawRequestReimbursement1599686647830 implements MigrationInterface {
    name = 'DrawRequestReimbursement1599686647830'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "public"."draw_request_reimbursement" ("id" SERIAL NOT NULL, "amount" money NOT NULL, "reimbursedDate" TIMESTAMP WITH TIME ZONE NOT NULL, "draw_request_id" uuid, CONSTRAINT "PK_e9a4f54a8c6d495254e83d3b9f5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "public"."draw_request_reimbursement" ADD CONSTRAINT "FK_81879c03e007a41610731d69b13" FOREIGN KEY ("draw_request_id") REFERENCES "public"."draw_request"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."draw_request_reimbursement" DROP CONSTRAINT "FK_81879c03e007a41610731d69b13"`);
        await queryRunner.query(`DROP TABLE "public"."draw_request_reimbursement"`);
    }

}
