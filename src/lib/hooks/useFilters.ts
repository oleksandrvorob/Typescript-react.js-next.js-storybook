import { useState, useCallback } from 'react'
import _omit from 'lodash/omit'
import _get from 'lodash/get'

export type Operator =
  | 'is'
  | 'is not'
  | 'contains'
  | 'does not contain'
  | 'is null'
  | 'is not null'
  | 'is in'
  | 'is not in'

type Value = string | number | null | Value[]

export interface Filter {
  field: string
  operator: Operator
  value: string
}

const consolidate = (field: string, operator: Operator, current: Value, incoming: Value) => {
  switch (operator) {
    case 'is':
      return { [`${field}__is in`]: [current, incoming] }
    case 'is not':
      return { [`${field}__is not in`]: [current, incoming] }
    default:
      return { [`${field}__${operator}`]: incoming }
  }
}

type Dictionary = {
  [key: string]: any
}

export default function useFilters(prelim: Dictionary = {}) {
  const [filters, setFilters] = useState<Dictionary>(prelim)

  const updateFilters = useCallback(
    (field, op, val) =>
      setFilters((x) => {
        const key = `${field}__${op}` as string
        if (!(key in filters)) {
          return { ...x, [key]: val }
        }

        const newItem = consolidate(field, op, x[key], val)
        return { ..._omit(x, key), ...newItem }
      }),
    [JSON.stringify(filters)],
  )

  return { filters, updateFilters }
}
