import {MigrationInterface, QueryRunner} from "typeorm";

export class AddressFieldsNonNullable1599241178769 implements MigrationInterface {
    name = 'AddressFieldsNonNullable1599241178769'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."address" ALTER COLUMN "street_line_1" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."address" ALTER COLUMN "city" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."address" ALTER COLUMN "state" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."address" ALTER COLUMN "zip_code" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."address" ALTER COLUMN "zip_code" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."address" ALTER COLUMN "state" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."address" ALTER COLUMN "city" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."address" ALTER COLUMN "street_line_1" DROP NOT NULL`);
    }

}
