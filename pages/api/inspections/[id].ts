import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'

import _isEmpty from 'lodash/isEmpty'

import { select } from 'lib/services/base'
import { getDiff } from 'lib/utils'

const handler = nextConnect()

handler
  // .get(async (req: NextApiRequest, res: NextApiResponse) => {
  //   const { id: draw_request_id } = req.query
  //   const inspections = await select('draw_inspection').where({ draw_request_id }).all()
  //   res.json({ inspections })
  // })
  // .post(
  //   withSession(async (req, res: NextApiResponse) => {
  //     const user = req.session.get('user')
  //     const { id: drawRequestId } = req.query
  //     const { orderedDate } = req.body

  //     try {
  //       const drawInspection = await select('draw_inspection').insert({
  //         drawRequestId,
  //         orderedDate,
  //         createdBy: user.id,
  //       }).return`id`

  //       // console.log(req.body)
  //       console.log(drawInspection)
  //     } catch (e) {
  //       console.log(e)
  //     }

  //     res.json({ hi: 'hid' })
  //   }),
  // )
  .patch(async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query

    const row = await select('draw_inspection').where({ id }).one()

    const updates = getDiff(row, req.body)

    let updatedRow = {}

    if (!_isEmpty(updates)) {
      try {
        updatedRow = await select('draw_inspection').where({ id }).set(updates).return`*`.one()
      } catch (e) {
        console.log(e)
      }
    }

    res.json(updatedRow)
  })

export default handler
