import { MigrationInterface, QueryRunner } from "typeorm";

export class DrawRequestAddKnackId1601493163320 implements MigrationInterface {
  name = 'DrawRequestAddKnackId1601493163320'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."draw_request" ADD "knack_id" character varying`);
    await queryRunner.query(`ALTER TABLE "public"."draw_request" ADD CONSTRAINT "UQ_c40400c5b78b400cea8594960a6" UNIQUE ("knack_id")`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."UQ_0c7b3c544d572f73edcf87592b1"`);
    await queryRunner.query(`ALTER TABLE "public"."draw_request" DROP CONSTRAINT "UQ_c40400c5b78b400cea8594960a6"`);
  }

}
