import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'

import { getSQ } from 'lib/services/base'

const handler = nextConnect()

handler
  .get(async (_req: NextApiRequest, res: NextApiResponse) => {
    const sq = getSQ()

    const _rows = sq.from`public.user`
    const _rowCount = _rows.sql`select count(*) as count from ${_rows} x`

    const [rows, rowCount] = await Promise.all([
      _rows,
      _rowCount.all().then((x) => x?.[0]?.count ?? 0),
    ])

    await sq.end()

    res.json({ rows, rowCount })
  })
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    const sq = getSQ()

    const { name, email, password } = req.body
    const user = await sq.from`public.user`.where({ email }).one()

    if (user) {
      await sq.end()

      res.statusCode = 409
      res.statusMessage = 'user already exists'
      res.end()
    } else {
      const query = sq.from`public.user`.insert({ name, email, password }).return`*`
      const newUser = await query.one()

      await sq.end()

      res.json({ user: newUser })
    }
  })

export default handler
