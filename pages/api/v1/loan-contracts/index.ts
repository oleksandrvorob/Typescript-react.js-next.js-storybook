import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import { getRepository } from 'typeorm'

// Local imports
import { initializeDatabase } from 'server/database'
import { LoanContract } from 'entities/LoanContract'

const handler = nextConnect()

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    page = 0,
    rowsPerPage = 5,
    orderBy = 'id',
    order = 'desc',
    searchTerm,
    ...filters
  } = req.query

  const connection = await initializeDatabase()
  const lcRepo = getRepository(LoanContract)

  let query = lcRepo
    .createQueryBuilder('t1')
    .leftJoinAndSelect('t1.drawRequests', 't2')
    .leftJoinAndSelect('t1.address', 't3')
    .leftJoinAndSelect('t1.reimbursements', 't4')
    .leftJoinAndSelect('t1.fci', 't5')

  // @ts-ignore
  query = query.orderBy(`t1.${orderBy}`, order.toUpperCase())

  // TODO: flesh this out more
  if (!!filters) {
    Object.entries(filters).forEach(([k, v]) => {
      const [key, action] = k.split("_")
      query = query.where(`t1.${key} = ${v}`)
    })
  }

  // @ts-ignore
  query = query.take(rowsPerPage)
  // @ts-ignore
  query = query.skip(page * rowsPerPage || 0)

  if (searchTerm) {
    query = query.where(`t1.fullAddress ilike '%${searchTerm}%'`)
  }

  try {
    const results = await query.getManyAndCount()
    console.log(results)
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
