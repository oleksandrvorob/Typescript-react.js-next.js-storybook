import {MigrationInterface, QueryRunner} from "typeorm";

export class AddressStandardizedFixCountry1606866961194 implements MigrationInterface {
    name = 'AddressStandardizedFixCountry1606866961194'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."address_standardized" DROP CONSTRAINT "FK_2a370436c054b7f06f3b04a9e3d"`);
        await queryRunner.query(`ALTER TABLE "public"."address_standardized" RENAME COLUMN "user_id" TO "country_id"`);
        await queryRunner.query(`ALTER TABLE "public"."address_standardized" ADD CONSTRAINT "FK_0b35774ae22a38bdb6da1705096" FOREIGN KEY ("country_id") REFERENCES "public"."country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."address_standardized" DROP CONSTRAINT "FK_0b35774ae22a38bdb6da1705096"`);
        await queryRunner.query(`ALTER TABLE "public"."address_standardized" RENAME COLUMN "country_id" TO "user_id"`);
        await queryRunner.query(`ALTER TABLE "public"."address_standardized" ADD CONSTRAINT "FK_2a370436c054b7f06f3b04a9e3d" FOREIGN KEY ("user_id") REFERENCES "public"."country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
