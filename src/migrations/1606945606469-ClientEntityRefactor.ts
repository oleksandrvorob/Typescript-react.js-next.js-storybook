import { MigrationInterface, QueryRunner } from "typeorm";

export class ClientEntityRefactor1606945606469 implements MigrationInterface {
  name = 'ClientEntityRefactor1606945606469'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."client_entity" DROP CONSTRAINT "FK_323057802f1b15ebe08535c0682"`);
    await queryRunner.query(`CREATE TABLE "public"."client_entity_type" ("id" SERIAL NOT NULL, "name" text NOT NULL, CONSTRAINT "UQ_c266470c64caa59f3a41b234235" UNIQUE ("name"), CONSTRAINT "PK_921d7df1fbdf662f614e2b5d6fb" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "public"."contact" ("id" SERIAL NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "phone" integer, "email" character varying, CONSTRAINT "PK_825a115f306385ce8ba99b0b3da" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE UNIQUE INDEX "IDX_59eaa6559f40bc66d8d2433fee" ON "public"."contact" ("first_name", "last_name", "phone", "email") `);
    await queryRunner.query(`CREATE TABLE "public"."client_entity_to_contact" ("title" character varying NOT NULL, "ownership" numeric(2,2) NOT NULL DEFAULT 0, "contact_id" integer NOT NULL, "client_entity_id" integer NOT NULL, CONSTRAINT "PK_00bf61d2b0c93bd99b8ae0a5715" PRIMARY KEY ("contact_id", "client_entity_id"))`);
    await queryRunner.query(`ALTER TABLE "public"."client_entity" DROP COLUMN "company_id"`);
    await queryRunner.query(`ALTER TABLE "public"."client_entity" ADD "knack_auto_increment" integer`);
    await queryRunner.query(`ALTER TABLE "public"."client_entity" ADD CONSTRAINT "UQ_393edf581f9d5b7dd20c54a343f" UNIQUE ("knack_auto_increment")`);
    await queryRunner.query(`ALTER TABLE "public"."client_entity" ADD "knack_id" text`);
    await queryRunner.query(`ALTER TABLE "public"."client_entity" ADD CONSTRAINT "UQ_542958af9b76f38c37158c89b54" UNIQUE ("knack_id")`);
    await queryRunner.query(`ALTER TABLE "public"."client_entity" ADD "knack_company_id" text`);
    await queryRunner.query(`ALTER TABLE "public"."client_entity" ADD "cid" integer`);
    await queryRunner.query(`ALTER TABLE "public"."client_entity" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "public"."client_entity" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "public"."client_entity" ADD "type_id" integer`);
    await queryRunner.query(`ALTER TABLE "public"."client_entity" ADD "address_id" integer`);
    await queryRunner.query(`CREATE SEQUENCE "public"."client_entity_id_seq" OWNED BY "public"."client_entity"."id"`);
    await queryRunner.query(`ALTER TABLE "public"."client_entity" ALTER COLUMN "id" SET DEFAULT nextval('public.client_entity_id_seq')`);
    await queryRunner.query(`ALTER TABLE "public"."client_entity" ADD CONSTRAINT "FK_921d7df1fbdf662f614e2b5d6fb" FOREIGN KEY ("type_id") REFERENCES "public"."client_entity_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "public"."client_entity" ADD CONSTRAINT "FK_e5a4b640690098bf7407bd42cd3" FOREIGN KEY ("address_id") REFERENCES "public"."address_standardized"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "public"."client_entity_to_contact" ADD CONSTRAINT "FK_aaf806c20f771cbac2f1698ed5c" FOREIGN KEY ("contact_id") REFERENCES "public"."contact"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "public"."client_entity_to_contact" ADD CONSTRAINT "FK_cac911023e3c9a967f935355f0d" FOREIGN KEY ("client_entity_id") REFERENCES "public"."client_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."client_entity_to_contact" DROP CONSTRAINT "FK_cac911023e3c9a967f935355f0d"`);
    await queryRunner.query(`ALTER TABLE "public"."client_entity_to_contact" DROP CONSTRAINT "FK_aaf806c20f771cbac2f1698ed5c"`);
    await queryRunner.query(`ALTER TABLE "public"."client_entity" DROP CONSTRAINT "FK_e5a4b640690098bf7407bd42cd3"`);
    await queryRunner.query(`ALTER TABLE "public"."client_entity" DROP CONSTRAINT "FK_921d7df1fbdf662f614e2b5d6fb"`);
    await queryRunner.query(`ALTER TABLE "public"."client_entity" ALTER COLUMN "id" DROP DEFAULT`);
    await queryRunner.query(`DROP SEQUENCE "public"."client_entity_id_seq"`);
    await queryRunner.query(`ALTER TABLE "public"."client_entity" DROP COLUMN "address_id"`);
    await queryRunner.query(`ALTER TABLE "public"."client_entity" DROP COLUMN "type_id"`);
    await queryRunner.query(`ALTER TABLE "public"."client_entity" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "public"."client_entity" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "public"."client_entity" DROP COLUMN "cid"`);
    await queryRunner.query(`ALTER TABLE "public"."client_entity" DROP COLUMN "knack_company_id"`);
    await queryRunner.query(`ALTER TABLE "public"."client_entity" DROP CONSTRAINT "UQ_542958af9b76f38c37158c89b54"`);
    await queryRunner.query(`ALTER TABLE "public"."client_entity" DROP COLUMN "knack_id"`);
    await queryRunner.query(`ALTER TABLE "public"."client_entity" DROP CONSTRAINT "UQ_393edf581f9d5b7dd20c54a343f"`);
    await queryRunner.query(`ALTER TABLE "public"."client_entity" DROP COLUMN "knack_auto_increment"`);
    await queryRunner.query(`ALTER TABLE "public"."client_entity" ADD "company_id" integer`);
    await queryRunner.query(`DROP TABLE "public"."client_entity_to_contact"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_59eaa6559f40bc66d8d2433fee"`);
    await queryRunner.query(`DROP TABLE "public"."contact"`);
    await queryRunner.query(`DROP TABLE "public"."client_entity_type"`);
    await queryRunner.query(`ALTER TABLE "public"."client_entity" ADD CONSTRAINT "FK_323057802f1b15ebe08535c0682" FOREIGN KEY ("company_id") REFERENCES "public"."client_company"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
  }

}
