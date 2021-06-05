import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'

import { Get } from 'lib/services/base'

const handler = nextConnect()

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query
  const loanContractDrawInfo = await Get('loan_contract_draw_view', 'id', Number(id))
  res.json({ loanContractDrawInfo })
})

export default handler
