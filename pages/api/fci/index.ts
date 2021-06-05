import { NextApiRequest, NextApiResponse } from 'next'

import { List } from 'lib/services/fci'
import { ApiQuery } from 'lib/interfaces'
import { Order } from 'lib/types'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    page = 0,
    rowsPerPage = 5,
    orderBy = 'id',
    order = 'desc' as Order,
    searchTerm,
    ...filters
  } = req.query

  const data = await List({
    page,
    rowsPerPage,
    order,
    orderBy,
    searchTerm,
    filters,
  } as ApiQuery)

  const [rows, rowCount, columns] = data

  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({ rows, rowCount, columns }))
}
