import {MigrationInterface, QueryRunner} from "typeorm";

export class CountryFixId1606866224340 implements MigrationInterface {
    name = 'CountryFixId1606866224340'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."address_standardized" DROP CONSTRAINT "FK_2a370436c054b7f06f3b04a9e3d"`);
        await queryRunner.query(`CREATE SEQUENCE "public"."country_id_seq" OWNED BY "public"."country"."id"`);
        await queryRunner.query(`ALTER TABLE "public"."country" ALTER COLUMN "id" SET DEFAULT nextval('public.country_id_seq')`);
        await queryRunner.query(`ALTER TABLE "public"."address_standardized" ADD CONSTRAINT "FK_2a370436c054b7f06f3b04a9e3d" FOREIGN KEY ("user_id") REFERENCES "public"."country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."address_standardized" DROP CONSTRAINT "FK_2a370436c054b7f06f3b04a9e3d"`);
        await queryRunner.query(`ALTER TABLE "public"."country" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "public"."country_id_seq"`);
        await queryRunner.query(`ALTER TABLE "public"."address_standardized" ADD CONSTRAINT "FK_2a370436c054b7f06f3b04a9e3d" FOREIGN KEY ("user_id") REFERENCES "public"."country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
