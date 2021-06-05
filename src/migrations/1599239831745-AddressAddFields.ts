import {MigrationInterface, QueryRunner} from "typeorm";

export class AddressAddFields1599239831745 implements MigrationInterface {
    name = 'AddressAddFields1599239831745'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."address" ADD "city" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."address" ADD "state" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."address" ADD "zip_code" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."address" ADD "street_line_1" character varying`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_0c2c03820f50a138bc47f432fc" ON "public"."address" ("google_place_id") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_985e138c5281beb2dbd3e9b708" ON "public"."address" ("formatted") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_985e138c5281beb2dbd3e9b708"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0c2c03820f50a138bc47f432fc"`);
        await queryRunner.query(`ALTER TABLE "public"."address" DROP COLUMN "street_line_1"`);
        await queryRunner.query(`ALTER TABLE "public"."address" DROP COLUMN "zip_code"`);
        await queryRunner.query(`ALTER TABLE "public"."address" DROP COLUMN "state"`);
        await queryRunner.query(`ALTER TABLE "public"."address" DROP COLUMN "city"`);
    }

}
