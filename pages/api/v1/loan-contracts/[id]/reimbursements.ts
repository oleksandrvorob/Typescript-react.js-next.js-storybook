import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'

// Local imports
import { initializeDatabase } from 'server/database'
import { LoanContract } from 'entities/LoanContract'
import { DrawRequestReimbursement } from 'entities/DrawRequestReimbursement'

const handler = nextConnect()

handler
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query
    const { amount, reimbursedDate } = req.body

    const connection = await initializeDatabase()

    try {
      const lcRepo = connection.getRepository(LoanContract)
      const reimbursementRepo = connection.getRepository(DrawRequestReimbursement)

      const loanContract = await lcRepo.findOne(id as string)

      if (loanContract) {
        const created = reimbursementRepo.create({
          amount,
          reimbursedDate,
          loanContract,
        })

        const saved = await reimbursementRepo.save(created)

        await connection.close()

        return res.json(saved)
      }

      await connection.close()

      return res.status(404).send('no loan contract found by that id')
    } catch (e) {
      console.log(e)
      connection.close()
      res.status(500).send(e.toString())
    }
  })

export default handler
