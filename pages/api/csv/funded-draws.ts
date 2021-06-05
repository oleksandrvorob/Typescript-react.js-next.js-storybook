import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import { Parser } from 'json2csv';

import { getSQ } from 'lib/services/base'

const fields = [
  "FCI Loan #",
  "Loan ID",
  "Asset Address",
  "Legal ID",
  "Client",
  "Single Draw Approved",
  "Inspection Fee",
  "Wire Fee",
  "NetWireOutDraw calc",
  "Draw Date",
  "Ref #",
  "Assignment",
]

const handler = nextConnect()

handler
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    const { startDate, endDate } = req.query

    const sq = getSQ({ mapOutputKeys: key => key })

    const base = sq.raw(`
    SELECT
        t2.fci_loan_id as "FCI Loan #",
        t2.lid as "Loan ID",
        t2.full_address as "Asset Address",
        t2.lid as "Legal ID",
        t2.borrower_name as "Client",
        t1.approved_amount as "Single Draw Approved",
        t1.inspection_fee as "Inspection Fee",
        t1.wire_fee as "Wire Fee",
        t1.approved_amount - t1.inspection_fee - t1.wire_fee as "NetWireOutDraw calc",
        to_char(timezone('America/Los_Angeles', t1.disbursed_date), 'YYYY-mm-dd') as "Draw Date",
        null as "Ref #",
        t3.lender_name as "Assignment"
    FROM draw_request t1
    JOIN loan_contract t2
        ON t1.loan_id = t2.id
    LEFT JOIN fci t3 ON t2.fci_loan_id = t3.loan_id
    `)

    const query = sq.extend([
      sq.sql(base),
      sq.sql`where t1.status = 'funded'`,
      sq.sql`and t1.disbursed_date >= ${startDate}`,
      sq.sql`and t1.disbursed_date < ${endDate}::date + INTERVAL '1 day'`
    ]
    )

    console.log(query.query)

    const rows = await sq.sql(query).all()

    await sq.end()

    const json2csv = new Parser({ fields });
    const csv = json2csv.parse(rows);

    res.setHeader('Content-Type', 'text/csv');
    res.send(csv)
  })

export default handler












