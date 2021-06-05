import { NextApiRequest, NextApiResponse } from 'next'
import { List } from 'lib/services/charts'

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  const data = await List()

  res.status(200).json(data)
}
