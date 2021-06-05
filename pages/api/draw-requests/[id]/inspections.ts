import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import { getSession } from 'next-auth/client'

import { select, getSQ } from 'lib/services/base'

const handler = nc<NextApiRequest, NextApiResponse>()

handler
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    const { id: draw_request_id } = req.query

    const sq = getSQ()

    const query = sq.from({ t1: 'draw_inspection' }).leftJoin({ t2: 'inspection_vendor' })
      .on`t1.vendor_id = t2.id`.return`t1.*, row_to_json(t2.*) as vendor`
      .where`t1.draw_request_id = ${draw_request_id}`

    let inspections = []

    try {
      inspections = await query.all()
    } catch (e) {
      console.log(e)
    }

    await sq.end()

    res.json(inspections)
  })
  .post(async (req, res: NextApiResponse) => {
    const session = await getSession({ req })
    const { user } = session

    if (!user) {
      res.statusCode = 403
      res.statusMessage = 'access denied'
      res.end()
    }

    const sq = getSQ()

    const foundUser = await sq.from`users`.where({ email: user?.email }).one()

    if (!foundUser) {
      res.statusCode = 403
      res.statusMessage = 'access denied'
      res.end()
    }

    const { id: drawRequestId } = req.query

    let drawInspection = {}

    try {
      drawInspection = await select('draw_inspection').insert({
        drawRequestId,
        createdBy: foundUser.id,
        ...req.body,
      }).return`id`
    } catch (e) {
      console.log(e)
    }

    res.json(drawInspection)
  })
// .patch(async (req: NextApiRequest, res: NextApiResponse) => {
//   const { id } = req.query

//   try {
//     const drawInspection = await select('draw_inspection').insert({
//       drawRequestId,
//       orderedDate,
//       createdBy: user.id,
//     }).return`id`

//     // console.log(req.body)
//     console.log(drawInspection)
//   } catch (e) {
//     console.log(e)
//   }
//   res.json(updatedRow)
// })

export default handler
