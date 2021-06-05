import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'

import { getSQ } from 'lib/services/base'

const handler = nextConnect()

handler
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    const { id: loanId } = req.query

    const sq = getSQ()

    const drawRequests = await sq.from`draw_request`.where({ loanId }).all()

    await sq.end()

    res.json(drawRequests)
  })
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    const { id: loanId } = req.query
    const { amount: requestedAmount, date: requestedDate } = req.body

    const sq = getSQ()

    const drawRequest = await sq.from`draw_request`
      .insert({
        loanId,
        requestedAmount,
        requestedDate,
      })
      .return('*')
      .one()

    await sq.end()

    res.json({ drawRequest })
  })

export default handler
