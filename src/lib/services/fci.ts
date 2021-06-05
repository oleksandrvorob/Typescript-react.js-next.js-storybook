import pg from 'pg'
import sqorn from '@sqorn/pg'
// @ts-ignore
import { SQF } from '@sqorn/pg/types'
import _camel from 'camelcase-keys'
import { connectionString } from './utils'

import { ApiQuery } from '../interfaces'

const TABLE_NAME = 'fci_view'

// don't worry about timezone info with straight-up dates
// pg.types.setTypeParser(pg.types.builtins.DATE, (x: string) => x)

const snake = (str: string) => str.replace(/[A-Z]/g, (letter: string) => `_${letter.toLowerCase()}`)
const camel = (x: Object) => _camel(x, { deep: true })
const filterNested = (x) => x.filter((x) => !x?.id?.startsWith('nested'))

import { getColumns } from './utils'

function addFilters(sq: SQF, filters: Object) {
  // loop over filters and add them according to type
  for (let [slug, v] of Object.entries(filters)) {
    const [k, op] = slug.split('__')

    const { e } = sq
    const field = snake(k)

    if (op === 'is') {
      sq = sq.where(e.eq(sq.raw(field), v))
    } else if (op === 'is not') {
      sq = sq.where(e.neq(sq.raw(field), v))
    } else if (op === 'contains') {
      sq = sq.where`${sq.raw(field)} ilike ${`%${v}%`}`
    } else if (op === 'does not contain') {
      sq = sq.where`${sq.raw(field)} not ilike ${`%${v}%`}`
    } else if (op === 'is null') {
      sq = sq.where`${sq.raw(`nullif(${field}::text, '')`)} is null`
    } else if (op === 'is not null') {
      sq = sq.where`${sq.raw(`nullif(${field}::text, '')`)} is not null`
    }
  }

  return sq
}

export const List = async (p: ApiQuery) => {
  const pool = new pg.Pool({ connectionString })
  const sq = sqorn({ pg, pool })

  let base = sq.from(TABLE_NAME)

  if (!!p?.searchTerm) {
    base = base.where`full_address ilike ${`%${p.searchTerm}%`}`
  }
  // add filters before counting
  const filtered = addFilters(base, p.filters)
  // rowCount for table
  const count = sq.sql`select count(*) as count from ${filtered} x`

  // pagination and order
  const ordered = filtered.orderBy({
    by: snake(p?.orderBy ?? 'loan_id'),
    sort: p?.order ?? 'desc',
  })
  const paginated = ordered.limit(5).offset(p.page * p.rowsPerPage || 0)

  const cols = getColumns(sq, TABLE_NAME)

  return await Promise.all([
    paginated.all().then(camel),
    count.all().then((x) => x?.[0]?.count ?? 0),
    cols.all().then(filterNested).then(camel),
  ])
}

export const Get = async (id: number) => {
  const pool = new pg.Pool({ connectionString })
  const sq = sqorn({ pg, pool })

  let base = sq.from(TABLE_NAME).where`loan_id = ${id}`
  let potentialMatches = sq.from('fci_matches').where`loan_id = ${id}`

  return await Promise.all([base.one().then(camel), potentialMatches.one().then(camel)])
}
