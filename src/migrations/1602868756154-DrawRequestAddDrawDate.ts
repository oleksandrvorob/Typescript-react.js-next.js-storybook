import { MigrationInterface, QueryRunner } from "typeorm";

export class DrawRequestAddDrawDate1602868756154 implements MigrationInterface {
  name = 'DrawRequestAddDrawDate1602868756154'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."draw_request" ADD "draw_date" TIMESTAMP WITH TIME ZONE`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."draw_request" DROP COLUMN "draw_date"`);
  }

}
