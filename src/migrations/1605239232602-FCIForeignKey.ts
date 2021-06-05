import { MigrationInterface, QueryRunner } from "typeorm";

export class FCIForeignKey1605239232602 implements MigrationInterface {
  name = 'FCIForeignKey1605239232602'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."fci" DROP CONSTRAINT "FK_f4178980202b6829761a9b04930"`);
    await queryRunner.query(`ALTER TABLE "public"."fci" ADD CONSTRAINT "FK_3b5b68d1eafdfe4a0589b86f4a0" FOREIGN KEY ("address_id") REFERENCES "public"."address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "public"."loan_contract" ADD CONSTRAINT "FK_43e35e81047f8ab86c88bb9c167" FOREIGN KEY ("fci_loan_id") REFERENCES "public"."fci"("loan_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."loan_contract" DROP CONSTRAINT "FK_43e35e81047f8ab86c88bb9c167"`);
    await queryRunner.query(`ALTER TABLE "public"."fci" DROP CONSTRAINT "FK_3b5b68d1eafdfe4a0589b86f4a0"`);
    await queryRunner.query(`ALTER TABLE "public"."fci" ADD CONSTRAINT "FK_f4178980202b6829761a9b04930" FOREIGN KEY ("address_id") REFERENCES "public"."address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

}
