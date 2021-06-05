import {MigrationInterface, QueryRunner} from "typeorm";

export class Permission1599082640960 implements MigrationInterface {
    name = 'Permission1599082640960'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "public"."permission" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_2b4b9f667345d2010f6b64b5dc8" UNIQUE ("name"), CONSTRAINT "PK_5fdbe810f27ad2158d241b56b76" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "public"."permission"`);
    }

}
