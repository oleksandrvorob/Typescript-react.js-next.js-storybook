import { MigrationInterface, QueryRunner } from 'typeorm'

export class UsersDrawRequestViewAddUserId1598465997617 implements MigrationInterface {
  name = 'UsersDrawRequestViewAddUserId1598465997617'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "public"."typeorm_metadata" WHERE "type" = 'VIEW' AND "schema" = $1 AND "name" = $2`,
      ['public', 'users_draw_request_view'],
    )
    await queryRunner.query(`DROP VIEW "public"."users_draw_request_view"`)
    await queryRunner.query(`CREATE VIEW "public"."users_draw_request_view" AS 
          SELECT
            t5.id,
            t5.requested_amount,
            t5.requested_date,
            t5.approved_amount,
            t5.approved_date,
            t5.status,
            t1.user_id,
            t2.id as company_id,
            t2.company_name,
            t4.lid,
            t4.full_address,
            t4.amount as loan_amount,
            split_part(t6.formatted, ', ', 1) AS address,
            split_part(t6.formatted, ', ', 2) AS city,
            split_part(split_part(t6.formatted, ', ', 3), ' ', 1) AS state,
            split_part(split_part(t6.formatted, ', ', 3), ' ', 2) AS zip_code
          FROM users_company t1
          JOIN client_company t2 ON t1.company_id = t2.id
          JOIN client_entity t3 ON t2.id = t3.company_id
          JOIN loan_contract t4 ON t3.id = t4.cid
          JOIN draw_request t5 ON t5.loan_id = t4.id
          JOIN address t6 ON t4.address_id = t6.id
    `)
    await queryRunner.query(
      `INSERT INTO "public"."typeorm_metadata"("type", "schema", "name", "value") VALUES ($1, $2, $3, $4)`,
      [
        'VIEW',
        'public',
        'users_draw_request_view',
        "SELECT\n      t5.id,\n      t5.requested_amount,\n      t5.requested_date,\n      t5.approved_amount,\n      t5.approved_date,\n      t5.status,\n      t1.user_id,\n      t2.id as company_id,\n      t2.company_name,\n      t4.lid,\n      t4.full_address,\n      t4.amount as loan_amount,\n      split_part(t6.formatted, ', ', 1) AS address,\n      split_part(t6.formatted, ', ', 2) AS city,\n      split_part(split_part(t6.formatted, ', ', 3), ' ', 1) AS state,\n      split_part(split_part(t6.formatted, ', ', 3), ' ', 2) AS zip_code\n    FROM users_company t1\n    JOIN client_company t2 ON t1.company_id = t2.id\n    JOIN client_entity t3 ON t2.id = t3.company_id\n    JOIN loan_contract t4 ON t3.id = t4.cid\n    JOIN draw_request t5 ON t5.loan_id = t4.id\n    JOIN address t6 ON t4.address_id = t6.id",
      ],
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "public"."typeorm_metadata" WHERE "type" = 'VIEW' AND "schema" = $1 AND "name" = $2`,
      ['public', 'users_draw_request_view'],
    )
    await queryRunner.query(`DROP VIEW "public"."users_draw_request_view"`)
    await queryRunner.query(`CREATE VIEW "public"."users_draw_request_view" AS SELECT
          t5.id,
          t5.requested_amount,
          t5.requested_date,
          t5.approved_amount,
          t5.approved_date,
          t5.status,
          t2.id as company_id,
          t2.company_name,
          t4.lid,
          t4.full_address,
          t4.amount as loan_amount,
          split_part(t6.formatted, ', ', 1) AS address,
          split_part(t6.formatted, ', ', 2) AS city,
          split_part(split_part(t6.formatted, ', ', 3), ' ', 1) AS state,
          split_part(split_part(t6.formatted, ', ', 3), ' ', 2) AS zip_code
        FROM users_company t1
        JOIN client_company t2 ON t1.company_id = t2.id
        JOIN client_entity t3 ON t2.id = t3.company_id
        JOIN loan_contract t4 ON t3.id = t4.cid
        JOIN draw_request t5 ON t5.loan_id = t4.id
        JOIN address t6 ON t4.address_id = t6.id`)
    await queryRunner.query(
      `INSERT INTO "public"."typeorm_metadata"("type", "schema", "name", "value") VALUES ($1, $2, $3, $4)`,
      [
        'VIEW',
        'public',
        'users_draw_request_view',
        "SELECT\n      t5.id,\n      t5.requested_amount,\n      t5.requested_date,\n      t5.approved_amount,\n      t5.approved_date,\n      t5.status,\n      t2.id as company_id,\n      t2.company_name,\n      t4.lid,\n      t4.full_address,\n      t4.amount as loan_amount,\n      split_part(t6.formatted, ', ', 1) AS address,\n      split_part(t6.formatted, ', ', 2) AS city,\n      split_part(split_part(t6.formatted, ', ', 3), ' ', 1) AS state,\n      split_part(split_part(t6.formatted, ', ', 3), ' ', 2) AS zip_code\n    FROM users_company t1\n    JOIN client_company t2 ON t1.company_id = t2.id\n    JOIN client_entity t3 ON t2.id = t3.company_id\n    JOIN loan_contract t4 ON t3.id = t4.cid\n    JOIN draw_request t5 ON t5.loan_id = t4.id\n    JOIN address t6 ON t4.address_id = t6.id",
      ],
    )
  }
}
