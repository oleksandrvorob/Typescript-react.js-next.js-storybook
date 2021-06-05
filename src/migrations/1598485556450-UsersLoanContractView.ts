import { MigrationInterface, QueryRunner } from 'typeorm'

export class UsersLoanContractView1598485556450 implements MigrationInterface {
  name = 'UsersLoanContractView1598485556450'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE VIEW "public"."users_loan_contract_view" AS 
    SELECT
      t1.user_id,
      t1.company_id,
      t2.company_name,
      t4.lid,
      t4.funding_date,
      t4.amount,
      t4.rehab_budget,
      t4.approved_holdback,
      t4.status,
      t4.full_address,
      split_part(t5.formatted, ', ', 1) AS address,
      split_part(t5.formatted, ', ', 2) AS city,
      split_part(split_part(t5.formatted, ', ', 3), ' ', 1) AS state,
      split_part(split_part(t5.formatted, ', ', 3), ' ', 2) AS zip_code,
      count(case when t6.status NOT IN ('held', 'funded') THEN 1 ELSE NULL END) AS open_draws,
      sum(t6.approved_amount) as drawn_to_date,
      t4.rehab_budget - sum(t6.approved_amount) AS remaining_holdback
    FROM users_company t1
    JOIN client_company t2 ON t1.company_id = t2.id
    JOIN client_entity t3 ON t2.id = t3.company_id
    JOIN loan_contract t4 ON t3.id = t4.cid
    JOIN address t5 ON t4.address_id = t5.id
    JOIN draw_request t6 ON t4.id = t6.loan_id
    WHERE t1.user_id = 1
    GROUP BY 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14
    `)
    await queryRunner.query(
      `INSERT INTO "public"."typeorm_metadata"("type", "schema", "name", "value") VALUES ($1, $2, $3, $4)`,
      [
        'VIEW',
        'public',
        'users_loan_contract_view',
        "SELECT\n      t1.user_id,\n      t1.company_id,\n      t2.company_name,\n      t4.lid,\n      t4.funding_date,\n      t4.amount,\n      t4.rehab_budget,\n      t4.approved_holdback,\n      t4.status,\n      t4.full_address,\n      split_part(t5.formatted, ', ', 1) AS address,\n      split_part(t5.formatted, ', ', 2) AS city,\n      split_part(split_part(t5.formatted, ', ', 3), ' ', 1) AS state,\n      split_part(split_part(t5.formatted, ', ', 3), ' ', 2) AS zip_code,\n      count(case when t6.status NOT IN ('held', 'funded') THEN 1 ELSE NULL END) AS open_draws,\n      sum(t6.approved_amount) as drawn_to_date,\n      t4.rehab_budget - sum(t6.approved_amount) AS remaining_holdback\n    FROM users_company t1\n    JOIN client_company t2 ON t1.company_id = t2.id\n    JOIN client_entity t3 ON t2.id = t3.company_id\n    JOIN loan_contract t4 ON t3.id = t4.cid\n    JOIN address t5 ON t4.address_id = t5.id\n    JOIN draw_request t6 ON t4.id = t6.loan_id\n    WHERE t1.user_id = 1\n    GROUP BY 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14",
      ],
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "public"."typeorm_metadata" WHERE "type" = 'VIEW' AND "schema" = $1 AND "name" = $2`,
      ['public', 'users_loan_contract_view'],
    )
    await queryRunner.query(`DROP VIEW "public"."users_loan_contract_view"`)
  }
}
