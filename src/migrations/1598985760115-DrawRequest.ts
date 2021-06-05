import {MigrationInterface, QueryRunner} from "typeorm";

export class DrawRequest1598985760115 implements MigrationInterface {
    name = 'DrawRequest1598985760115'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."draw_request_status_enum" AS ENUM('held', 'new', 'inspection ordered', 'inspection approved', 'approved', 'funded')`);
        await queryRunner.query(`CREATE TABLE "public"."draw_request" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "loan_id" integer NOT NULL, "draw_number" integer NOT NULL, "status" "public"."draw_request_status_enum" NOT NULL DEFAULT 'new', "approved_amount" money, "approved_amount_to_date" money, "notes" text, "requested_amount" money NOT NULL, "requested_date" TIMESTAMP WITH TIME ZONE NOT NULL, "approved_date" TIMESTAMP WITH TIME ZONE, "disbursed_date" TIMESTAMP WITH TIME ZONE, "manual_draw_id" text, "inspection_fee" money, "wire_fee" money, "active" boolean NOT NULL DEFAULT true, "user_id" integer, CONSTRAINT "PK_a8426faea8d5f0300c049e9a3ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_7598147fb5df213b1ee3252833" ON "public"."draw_request" ("loan_id", "requested_amount", "requested_date") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_24d44aa1d8e744ab49979c1884" ON "public"."draw_request" ("draw_number", "loan_id") `);
        await queryRunner.query(`ALTER TABLE "public"."draw_request" ADD CONSTRAINT "FK_b7f7f0721403df877f2fd504e05" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."draw_request" DROP CONSTRAINT "FK_b7f7f0721403df877f2fd504e05"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_24d44aa1d8e744ab49979c1884"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7598147fb5df213b1ee3252833"`);
        await queryRunner.query(`DROP TABLE "public"."draw_request"`);
        await queryRunner.query(`DROP TYPE "public"."draw_request_status_enum"`);
    }

}
