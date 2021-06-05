import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import { getRepository } from 'typeorm'

import { InspectionVendor } from 'entities/InspectionVendor'
import { initializeDatabase } from 'server/database'

const handler = nextConnect()

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const connection = await initializeDatabase()

    const repo = getRepository(InspectionVendor)

    const name = req.query?.name ?? ''

    let query = repo.createQueryBuilder('inspection_vendor')

    if (!!name) {
      const search = `%${name}%`
      query = query.where('name ILIKE :search', { search })
    }

    const inspectionVendors = await query.getMany()

    await connection.close()
    res.json({ inspectionVendors })
  } catch (e) {
    console.log(e)
    res.statusCode = 500
    res.statusMessage = e.toString()
    res.end()
  }
})

export default handler
