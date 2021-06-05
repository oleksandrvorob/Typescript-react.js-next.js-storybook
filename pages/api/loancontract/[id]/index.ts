import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'

import { Get, Patch } from 'lib/services/loanContract'

const handler = nextConnect()

handler
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query
    const [loanContract, knack] = await Get(Number(id))
    res.json({ loanContract, knack })
  })
  .patch(async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query
    const [updatedRow] = await Patch(Number(id), req.body)
    res.json(updatedRow)
  })

export default handler
