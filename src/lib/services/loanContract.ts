import pg from 'pg'
import sqorn from '@sqorn/pg'

import { connectionString, getColumns, camel, snake, addFilters } from './utils'

import { ApiQuery } from '../interfaces'

const TABLE_NAME = 'loan_contract'
// for read only
const VIEW_NAME = `${TABLE_NAME}_view`

// pg.types.setTypeParser(pg.types.builtins.DATE, (x: string) => x)

export const List = async (p: ApiQuery) => {
  const pool = new pg.Pool({ connectionString })
  const sq = sqorn({ pg, pool })

  let base = sq.from(VIEW_NAME)

  if (!!p?.searchTerm) {
    base = base.where`full_address ilike ${`%${p.searchTerm}%`}`
  }
  // add filters before counting
  const filtered = addFilters(base, p.filters)
  // rowCount for table
  const count = sq.sql`select count(*) as count from ${filtered} x`

  // pagination and order
  const ordered = filtered.orderBy({ by: snake(p?.orderBy ?? 'id'), sort: p?.order ?? 'desc' })
  const paginated = ordered.limit(5).offset(p.page * p.rowsPerPage || 0)

  // Nest fci data
  const fci = sq.sql`
    SELECT
      loan_id,
      array_to_json(array_agg(row_to_json(t1))) AS fci 
    FROM fci.loan t1
    WHERE loan_id in (SELECT DISTINCT fci_loan_id FROM ${ordered} x)
    GROUP BY 1
  `

  const sql = sq.sql`
    SELECT
      t1.*,
      t2.fci
    FROM ${paginated} t1
    LEFT JOIN ${fci} t2
        ON t1.fci_loan_id = t2.loan_id
  `

  const cols = getColumns(sq, VIEW_NAME)

  return await Promise.all([
    sql.all().then(camel),
    count.all().then((x) => x?.[0]?.count ?? 0),
    cols.all().then(camel),
  ])
}

export const Get = async (id: number) => {
  const pool = new pg.Pool({ connectionString })
  const sq = sqorn({ pg, pool, mapOutputKeys: (key) => key })

  let base = sq.from(VIEW_NAME).where`id = ${id}`
  let knack = sq.from('knack_backups.object_24').where`loan_index = ${id}`

  // const cols = getColumns(sq, TABLE_NAME)

  return await Promise.all([base.one().then(camel), knack.one()])
}

export const Patch = async (id: number, obj: Record<string, string | string[]>) => {
  const pool = new pg.Pool({ connectionString })
  const sq = sqorn({ pg, pool, mapOutputKeys: (key) => key })

  let base = sq.from(TABLE_NAME).where`id = ${id}`.set(obj).return`*`

  return await Promise.all([base.one()])
}
