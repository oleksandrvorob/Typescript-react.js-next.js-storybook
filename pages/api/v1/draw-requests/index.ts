import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import { getRepository } from 'typeorm'

// Local imports
import { initializeDatabase } from 'server/database'
import { DrawRequest } from 'entities/DrawRequest'

const handler = nextConnect()

handler.get(async (_req: NextApiRequest, res: NextApiResponse) => {
  const connection = await initializeDatabase()
  const drawRepo = getRepository(DrawRequest)

  let query = drawRepo
    .createQueryBuilder('t1')
    .leftJoinAndSelect('t1.loanContract', 't2')
    .leftJoinAndSelect('t2.address', 't3')
    .leftJoinAndSelect('t2.fci', 't4')

  query = query.where(`t1.status IN ('approved')`)
  query = query.orderBy('t1.disbursed_date', 'DESC')
  query = query.orderBy('t1.id', 'DESC')

  try {
    const results = await query.getManyAndCount()
    await connection.close()

    return res.json(results)
  } catch (e) {
    await connection.close()
    console.error(e)
    res.statusCode = 500
    res.statusMessage = e.toString()
    res.end()
  }
})

export default handler
