import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'

// Local imports
import { initializeDatabase } from 'server/database'
import { LoanContract } from 'entities/LoanContract'

const handler = nextConnect()

handler
  .patch(async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query
    const { accountingOpen } = req.body

    const connection = await initializeDatabase()

    try {
      const lcRepo = connection.getRepository(LoanContract)
      const loanContract = await lcRepo.findOne(id as string)

      if (loanContract) {
        loanContract.accountingOpen = accountingOpen

        await lcRepo.save(loanContract)

        await connection.close()
        return res.json(loanContract)
      } else {
        await connection.close()
        return res.status(404).send('no loan contract found by that id')
      }

    } catch (e) {
      console.log(e)
      connection.close()
      res.status(500).send(e.toString())
    }
  }).get(async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query

    const connection = await initializeDatabase()
    const lcRepo = connection.getRepository(LoanContract)

    let query = lcRepo
      .createQueryBuilder('t1')
      .innerJoinAndSelect('t1.drawRequests', 't2')
      .leftJoinAndSelect('t1.fci', 't3')
      .leftJoinAndSelect('t1.address', 't4')
    // .leftJoinAndSelect('t1.reimbursements', 't4')

    // TODO: make this a querystring
    query = query.where(`t1.id = ${id}`)


    try {
      const results = await query.getOne()
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
