import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import { getRepository } from 'typeorm'

// Local imports
import { initializeDatabase } from 'server/database'
import { Users } from 'entities/Users'

const handler = nextConnect()

handler.get(async (_req: NextApiRequest, res: NextApiResponse) => {
  const connection = await initializeDatabase()

  const userRepo = getRepository(Users)
  const query = userRepo
    .createQueryBuilder('t1')
    .leftJoinAndSelect('t1.permissions', 't2')
    .leftJoinAndSelect('t2.permission', 't3')

  const users = await query.getManyAndCount()

  await connection.close()

  return res.json(users)
})

export default handler
