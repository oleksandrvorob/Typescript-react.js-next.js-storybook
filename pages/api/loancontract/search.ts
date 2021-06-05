import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'

import { select } from 'lib/services/base'

const handler = nextConnect()

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const { search } = req.query

  const sq = select('loan_contract')
  const { e } = sq

  const query = sq.where(
    e`lower(full_address) like ${`%${search}%`}`.or(e`lid like ${`%${search}%`}`),
  )

  const rows = await query.limit`5`.all()

  res.json({ rows })
})

export default handler
