import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import { getRepository } from 'typeorm'

// Local imports
import { initializeDatabase } from 'server/database'
import { Permission } from 'entities/Permission'
import { Users } from 'entities/Users'
import { UsersPermissions } from 'entities/UsersPermissions'

const handler = nextConnect()

handler
  .put(async (req: NextApiRequest, res: NextApiResponse) => {
    const { userId, permissionId } = req.query
    const connection = await initializeDatabase()

    const permissionRepo = getRepository(Permission)
    const userRepo = getRepository(Users)

    const usersPermissionsRepo = getRepository(UsersPermissions)

    const user = await userRepo.findOne(userId as string)
    const permission = await permissionRepo.findOne(permissionId as string)

    if (user && permission) {
      const created = usersPermissionsRepo.create({
        user,
        permission,
      })

      const saved = await usersPermissionsRepo.save(created)

      await connection.close()

      return res.json(saved)
    }

    await connection.close()

    res.statusCode = 404
    res.end()
  })
  .delete(async (req: NextApiRequest, res: NextApiResponse) => {
    const { userId, permissionId } = req.query

    console.log(userId, permissionId)
    const connection = await initializeDatabase()

    const permissionRepo = connection.getRepository(Permission)
    const userRepo = connection.getRepository(Users)
    const usersPermissionsRepo = connection.getRepository(UsersPermissions)

    const user = await userRepo.findOne(userId as string)
    const permission = await permissionRepo.findOne(permissionId as string)

    if (!user || !permission) {
      await connection.close()
      res.statusCode = 404
      return res.end()
    }

    try {
      await usersPermissionsRepo
        .createQueryBuilder()
        .delete()
        .where('user_id = :userId', { userId })
        .where('permission_id = :permissionId', { permissionId })
        .execute()

      await connection.close()

      return res.json({ userId, permissionId })
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
