import {MigrationInterface, QueryRunner} from "typeorm";

export class LoanQuote1607639867281 implements MigrationInterface {
    name = 'LoanQuote1607639867281'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "public"."loan_quote" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "property_state" character varying(2), "estimated_fico" character varying, "property_type" character varying, "transaction_type" character varying, "base_loan_amount" money, "rehab_required" boolean, "estimated_rehab_amount" money, "after_repair_value" money, "broker_percentage" double precision, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, CONSTRAINT "PK_aa7d32fe076a9b165682515aea6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "public"."loan_quote" ADD CONSTRAINT "FK_39010c28ac7ef7d858affbcac04" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."loan_quote" DROP CONSTRAINT "FK_39010c28ac7ef7d858affbcac04"`);
        await queryRunner.query(`DROP TABLE "public"."loan_quote"`);
    }

}
