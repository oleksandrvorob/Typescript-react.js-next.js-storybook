import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import { Parser } from 'json2csv';

import { getSQ } from 'lib/services/base'

const fields = [
  "Loan ID",
  "Servicer Loan ID",
  "Borrower",
  "Address",
  "City",
  "State",
  "Transaction Date",
  "Transaction Type",
  "Total Funded by Quanta to Date",
  "Total Reimbursed by 1S to Date",
  "Approved Holdback",
  "Rehab Budget",
  "Approved HB % of Rehab Budget",
  "Transaction Amount - VL",
  "1S Total HB Disbursed INCLUDING Reimbursement Request",
  "1S % of HB Disbursed",
  "1S HB Shortfall",
  "% Complete per Recent Inspection",
]

const handler = nextConnect()

handler
  .get(async (_req: NextApiRequest, res: NextApiResponse) => {
    const sq = getSQ({ mapOutputKeys: key => key })

    const _rows = sq.raw(`
      WITH total_funded AS (
          SELECT
              loan_id,
              sum(approved_amount) as funded_amount_to_date,
              count(*)
          FROM draw_request
          where status >= 'funded'
          GROUP BY 1
      ), total_reimbursed AS (
          SELECT
              loan_id,
              sum(amount) as reimbursed_amount_to_date
          FROM draw_request_reimbursement
          GROUP BY 1
      ), inspections AS (
          SELECT
              t1.loan_id,
              t2.complete_percentage,
              row_number() over (partition by t1.loan_id order by t2.ordered_date desc) as rnum
          FROM draw_request t1
          JOIN draw_inspection t2
              ON t1.id = t2.draw_request_id
      ), inspections_deduped AS (
          SELECT loan_id, complete_percentage FROM inspections WHERE rnum = 1
      ), prelim as (
          SELECT
              t1.id,
              t1.lid,
              t2.loan_id as servicer_loan_id,
              t1.borrower_name,
              coalesce(t2.full_address, t1.full_address) as full_address,
              t2.city,
              t2.state,
              cast(now() AT TIME ZONE 'America/Los_Angeles' as date)::text as transaction_date,
              'Construction Draw' as transaction_type,
              t3.funded_amount_to_date,
              t4.reimbursed_amount_to_date,
              t1.rehab_budget,
              t1.approved_holdback,
              t1.rehab_budget / t1.approved_holdback as approved_hb_pctg_of_rehab_budget,
              coalesce(t3.funded_amount_to_date, 0::money) - coalesce(t4.reimbursed_amount_to_date, 0::money) as transaction_amount
          from loan_contract t1
          left join fci t2
              ON t1.fci_loan_id = t2.loan_id
          left join total_funded t3
              ON t1.id = t3.loan_id
          left join total_reimbursed t4
              ON t1.id = t4.loan_id
          where t1.accounting_open = true
      ), prelim_1 AS (
          SELECT
              *,
              transaction_amount + coalesce(reimbursed_amount_to_date, 0::money) as total_reimbursed_including_current
          FROM prelim
      ), prelim_2 AS (
          SELECT
              *,
              total_reimbursed_including_current / approved_holdback AS one_sharpe_pctg_of_hb_disbursed,
              (total_reimbursed_including_current / approved_holdback) / complete_percentage  as one_sharpe_hb_shortfall
          FROM prelim_1 t1
          LEFT JOIN inspections_deduped t2
              ON t1.id = t2.loan_id
      )
          SELECT
              lid as "Loan ID",
              servicer_loan_id as "Servicer Loan ID",
              borrower_name as "Borrower",
              full_address as "Address",
              city as "City",
              state as "State",
              transaction_date as "Transaction Date",
              transaction_type as "Transaction Type",
              funded_amount_to_date as "Total Funded by Quanta to Date",
              reimbursed_amount_to_date as "Total Reimbursed by 1S to Date",
              approved_holdback as "Approved Holdback",
              rehab_budget as "Rehab Budget",
              approved_hb_pctg_of_rehab_budget as "Approved HB % of Rehab Budget",
              transaction_amount as "Transaction Amount - VL",
              total_reimbursed_including_current as "1S Total HB Disbursed INCLUDING Reimbursement Request",
              one_sharpe_pctg_of_hb_disbursed as "1S % of HB Disbursed",
              one_sharpe_hb_shortfall as "1S HB Shortfall",
              complete_percentage as "% Complete per Recent Inspection"
      FROM prelim_2
    `)

    const rows = await sq.sql(_rows).all()

    await sq.end()

    const json2csv = new Parser({ fields });
    const csv = json2csv.parse(rows);

    res.setHeader('Content-Type', 'text/csv');
    res.send(csv)
  })

export default handler



















