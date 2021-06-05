// @ts-ignore
import { SQF } from '@sqorn/pg/types'
import _camel from 'camelcase-keys'

export const snake = (str: string) =>
  str.replace(/[A-Z]/g, (letter: string) => `_${letter.toLowerCase()}`)

export const camel = (x: Object) => _camel(x, { deep: true })

export const connectionString = (() => {
  const user = process.env.POSTGRES_USERNAME
  const password = process.env.POSTGRES_PASSWORD
  const host = process.env.POSTGRES_HOST
  const port = process.env.POSTGRES_PORT
  const db = process.env.POSTGRES_DATABASE

  return `postgresql://${user}:${password}@${host}:${port}/${db}`
})()

export const getColumns = (sq: SQF, table: string, schema = 'public') => sq.sql`
SELECT
    lower(substring(pascal_case,1,1)) || substring(pascal_case,2) AS id,
    case when data_type = 'integer' then true else false end as numeric,
    case when ordinal_position = 1 then true else false end as disable_padding,
    label,
    case
      when data_type = 'character varying' then 'text'
      when data_type like '%timestamp%' then 'timestamp'
      else data_type
    end as "type"
FROM (
  SELECT
      *,
      replace(initcap(replace(column_name, '_', ' ')), ' ', '') AS pascal_case,
      initcap(replace(column_name, '_', ' ')) AS label
  FROM information_schema.columns
  WHERE table_name = ${table}
  AND table_schema = ${schema}
) AS x;
`

export function addFilters(sq: SQF, filters: Object) {
  // loop over filters and add them according to type
  for (let [slug, v] of Object.entries(filters)) {
    const [k, op] = slug.split('__')

    const { e } = sq
    const field = snake(k)

    if (op === 'is') {
      const _func = Array.isArray(v) ? e.in : e.eq
      sq = sq.where(_func(sq.raw(field), v))
    } else if (op === 'is not') {
      const _func = Array.isArray(v) ? e.notIn : e.neq
      sq = sq.where(_func(sq.raw(field), v))
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
