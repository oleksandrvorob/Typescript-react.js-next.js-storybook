import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'

// Local imports
import { initializeDatabase } from 'server/database'
import { DrawRequestReimbursement } from 'entities/DrawRequestReimbursement'

const handler = nextConnect()

handler.delete(async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query

  const connection = await initializeDatabase()

  const repo = connection.getRepository(DrawRequestReimbursement)

  const reimbursement = await repo.findOne(parseFloat(id as string))

  if (!reimbursement) {
    await connection.close()
    res.statusCode = 404
    return res.end()
  }

  try {
    await repo.remove(reimbursement)

    await connection.close()

    return res.json({ id })
  } catch (e) {
    console.log(e)

    await connection.close()
    res.statusCode = 500
    res.statusMessage = e.toString()

    return res.end()
  }

  // res.end()
})

export default handler
