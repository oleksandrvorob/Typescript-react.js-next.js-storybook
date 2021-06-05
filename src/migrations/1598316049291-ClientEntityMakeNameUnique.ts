import { MigrationInterface, QueryRunner } from 'typeorm'

export class ClientEntityMakeNameUnique1598316049291 implements MigrationInterface {
  name = 'ClientEntityMakeNameUnique1598316049291'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."client_entity" ADD CONSTRAINT "UQ_a0c2b7da881ceaf27ba86917bf3" UNIQUE ("name")`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."client_entity" DROP CONSTRAINT "UQ_a0c2b7da881ceaf27ba86917bf3"`,
    )
  }
}
