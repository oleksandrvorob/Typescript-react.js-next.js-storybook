import {MigrationInterface, QueryRunner} from "typeorm";

export class LoanContractAddAddressSplit1605289154323 implements MigrationInterface {
    name = 'LoanContractAddAddressSplit1605289154323'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."loan_contract" ADD "address_line_1" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."loan_contract" ADD "city" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."loan_contract" ADD "state" character varying(2)`);
        await queryRunner.query(`ALTER TABLE "public"."loan_contract" ADD "zip_code" character varying(5)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."loan_contract" DROP COLUMN "zip_code"`);
        await queryRunner.query(`ALTER TABLE "public"."loan_contract" DROP COLUMN "state"`);
        await queryRunner.query(`ALTER TABLE "public"."loan_contract" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "public"."loan_contract" DROP COLUMN "address_line_1"`);
    }

}
