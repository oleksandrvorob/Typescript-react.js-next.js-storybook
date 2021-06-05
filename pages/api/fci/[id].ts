import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'

import { Get } from 'lib/services/fci'

const handler = nextConnect()

handler
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query
    const [fci, potentialMatches] = await Get(Number(id))
    res.json({ fci, potentialMatches })
  })
  .patch(async (_req: NextApiRequest, res: NextApiResponse) => {
    res.json({ hi: 'dude' })
  })

export default handler
