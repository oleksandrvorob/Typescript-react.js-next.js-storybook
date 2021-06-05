import { MigrationInterface, QueryRunner } from "typeorm";

export class Country1606864393275 implements MigrationInterface {
  name = 'Country1606864393275'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "public"."country" ("id" integer NOT NULL, "name" character varying(2) NOT NULL, CONSTRAINT "UQ_8d3c93e1012b679b67cd4344d23" UNIQUE ("name"), CONSTRAINT "PK_f1e41a6df5739da5ceefdbd5a1b" PRIMARY KEY ("id"))`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "public"."country"`);
  }

}
