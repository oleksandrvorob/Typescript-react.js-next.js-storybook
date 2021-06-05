import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import { getRepository } from 'typeorm'

// Local imports
import { initializeDatabase } from 'server/database'
import { Permission } from 'entities/Permission'

const handler = nextConnect()

handler
  .get(async (_req: NextApiRequest, res: NextApiResponse) => {
    const connection = await initializeDatabase()

    const permissionRepo = getRepository(Permission)
    const query = permissionRepo.createQueryBuilder('t1')

    const permissions = await query.getManyAndCount()

    await connection.close()

    return res.json(permissions)
  })
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    const { name } = req.body
    const connection = await initializeDatabase()

    const permissionRepo = getRepository(Permission)

    const newPermission = permissionRepo.create({ name })
    const saved = await permissionRepo.save(newPermission)

    await connection.close()

    return res.json(saved)
  })

export default handler
