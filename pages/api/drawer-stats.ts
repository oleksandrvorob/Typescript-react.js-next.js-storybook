import { NextApiRequest, NextApiResponse } from 'next'
import { getSQ } from 'lib/services/base'

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  const sq = getSQ()

  const { count: fundDrawsCount } = await sq.sql`select count(*)::numeric from draw_request where status = 'approved'`.one()
  const { count: drawReimbursementsCount } = await sq.sql`select count(*)::numeric from loan_contract where accounting_open = true`.one()

  await sq.end()

  res.status(200).json({ fundDrawsCount: parseInt(fundDrawsCount), drawReimbursementsCount: parseInt(drawReimbursementsCount) })
}
