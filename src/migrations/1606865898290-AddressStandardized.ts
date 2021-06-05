import {MigrationInterface, QueryRunner} from "typeorm";

export class AddressStandardized1606865898290 implements MigrationInterface {
    name = 'AddressStandardized1606865898290'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "public"."address_standardized" ("id" SERIAL NOT NULL, "address_1" text NOT NULL, "address_2" text, "city" text NOT NULL, "state" text NOT NULL, "zip_code" text NOT NULL, "user_id" integer, "place_id" integer, CONSTRAINT "PK_e258ef81896f67929ddad5a4912" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_ed587790fc1f32ab0695d855d4" ON "public"."address_standardized" ("address_1", "address_2", "city", "state", "zip_code") `);
        await queryRunner.query(`ALTER TABLE "public"."address_standardized" ADD CONSTRAINT "FK_2a370436c054b7f06f3b04a9e3d" FOREIGN KEY ("user_id") REFERENCES "public"."country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."address_standardized" ADD CONSTRAINT "FK_addbee46a5022478cc99a781582" FOREIGN KEY ("place_id") REFERENCES "public"."address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."address_standardized" DROP CONSTRAINT "FK_addbee46a5022478cc99a781582"`);
        await queryRunner.query(`ALTER TABLE "public"."address_standardized" DROP CONSTRAINT "FK_2a370436c054b7f06f3b04a9e3d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ed587790fc1f32ab0695d855d4"`);
        await queryRunner.query(`DROP TABLE "public"."address_standardized"`);
    }

}
