import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import { Parser } from 'json2csv';

import { getSQ } from 'lib/services/base'

const fields = [
  "id",
  "knackId",
  "loanId",
  "loanContract",
  "drawNumber",
  "status",
  "approvedAmount",
  "approvedAmountToDate",
  "notes",
  "requestedAmount",
  "requestedDate",
  "drawDate",
  "approvedDate",
  "disbursedDate",
  "reimbursedAmount",
  "reimbursedDate",
  "manualDrawId",
  "inspectionFee",
  "wireFee",
  "active",
]

const handler = nextConnect()



handler
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    const { loanId } = req.query

    console.log(loanId)

    const sq = getSQ()

    const rows = await sq.from`draw_request`.where({ loanId }).all()

    await sq.end()

    const json2csv = new Parser({ fields });
    const csv = json2csv.parse(rows);

    res.setHeader('Content-Type', 'text/csv');
    res.send(csv)
  })

export default handler
