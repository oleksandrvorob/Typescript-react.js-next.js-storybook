import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'

import { getSQ } from 'lib/services/base'

const handler = nextConnect()

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const { id: loanId, drawNumber } = req.query

  const sq = getSQ()

  const drawRequest = await sq.from`draw_request`.where({ loanId, drawNumber }).one()

  await sq.end()

  if (!drawRequest) {
    res.statusCode = 404
    res.statusMessage = 'draw request not found'
    res.end()
  } else {
    res.json({ drawRequest })
  }
})

export default handler
