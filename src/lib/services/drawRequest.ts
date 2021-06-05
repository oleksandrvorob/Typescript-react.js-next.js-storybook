import pg from 'pg'
import sqorn from '@sqorn/pg'

import { ApiQuery } from '../interfaces'

import { connectionString, getColumns, camel, snake, addFilters } from './utils'

// pg.types.setTypeParser(pg.types.builtins.DATE, (x: string) => x)

const VIEW_NAME = 'draw_request_view'

export const List = async (p: ApiQuery) => {
  const pool = new pg.Pool({ connectionString })
  const sq = sqorn({ pg, pool })

  let base = sq.from(VIEW_NAME)

  if (!!p?.searchTerm) {
    base = base.where`address ilike ${`%${p.searchTerm}%`}`
  }

  // add filters before counting
  const filtered = addFilters(base, p.filters)
  // rowCount for table
  const count = sq.sql`select count(*) as count from ${filtered} x`

  const page = parseInt(p?.page as unknown as string ?? '0')
  const rowsPerPage = parseInt(p?.rowsPerPage as unknown as string ?? '5')

  // pagination and order
  const paginated = filtered.limit(rowsPerPage).offset(page * rowsPerPage)
  const ordered = paginated.orderBy({ by: snake(p?.orderBy ?? 'id'), sort: p?.order ?? 'desc' })

  const cols = getColumns(sq, VIEW_NAME)

  return await Promise.all([
    ordered.all().then(camel),
    count.all().then((x) => x?.[0]?.count ?? 0),
    cols.all().then(camel),
  ])
}

export const Get = async (id: string) => {
  const pool = new pg.Pool({ connectionString })
  const sq = sqorn({ pg, pool, mapOutputKeys: (key) => key })

  let base = sq.from(VIEW_NAME).where`id = ${id}`
  // let knack = sq.from('knack_backups.object_24').where`loan_index = ${id}`

  // const cols = getColumns(sq, TABLE_NAME)

  return await base.one().then(camel)
}
