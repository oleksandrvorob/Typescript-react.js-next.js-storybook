import {MigrationInterface, QueryRunner} from "typeorm";

export class UsersPermission1599083083047 implements MigrationInterface {
    name = 'UsersPermission1599083083047'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "public"."users_permissions" ("user_id" integer NOT NULL, "permission_id" integer NOT NULL, CONSTRAINT "PK_6b5f8a80a97b8b331d52fe813fa" PRIMARY KEY ("user_id", "permission_id"))`);
        await queryRunner.query(`ALTER TABLE "public"."users_permissions" ADD CONSTRAINT "FK_c25a3dd86925466b0a3ac7a0529" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."users_permissions" ADD CONSTRAINT "FK_01d30f1d747bf846441e8ebfee7" FOREIGN KEY ("permission_id") REFERENCES "public"."permission"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."users_permissions" DROP CONSTRAINT "FK_01d30f1d747bf846441e8ebfee7"`);
        await queryRunner.query(`ALTER TABLE "public"."users_permissions" DROP CONSTRAINT "FK_c25a3dd86925466b0a3ac7a0529"`);
        await queryRunner.query(`DROP TABLE "public"."users_permissions"`);
    }

}
