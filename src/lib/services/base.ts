import pg from 'pg'
import sqorn from '@sqorn/pg'
// @ts-ignore
import { SQ, SQF } from '@sqorn/pg/types'

import { connectionString, camel } from './utils'

export const Get = async (table: string, column: string, id: number) => {
  const pool = new pg.Pool({ connectionString })
  const sq = sqorn({ pg, pool })

  let base = sq.from(table).where({ [column]: id })
  return await base.one()
}

export const select = (table: string): SQF => {
  const pool = new pg.Pool({ connectionString })
  const sq = sqorn({ pg, pool })

  return sq.from(table)
}

export const getSQ = (options = {}): SQ => {
  const pool = new pg.Pool({ connectionString })
  const sq = sqorn({ pg, pool, ...options })

  return sq
}
