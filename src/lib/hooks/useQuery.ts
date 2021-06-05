import { useState } from 'react'

import { ApiQuery } from '../interfaces'

import { useDebounce } from './useDebounce'

export function useQuery(initial: Partial<ApiQuery>): [Partial<ApiQuery>, (obj: Partial<ApiQuery>) => void, string] {
  const [query, setQuery] = useState<Partial<ApiQuery>>(initial)

  const { filters = [], ..._query } = query

  const queryString = new URLSearchParams((Object.entries(_query) as string[][]).concat(filters as string[][]))
  // const queryString = new URLSearchParams((Object.entries(_query) as string[][]))

  const debouncedUrl = useDebounce(queryString.toString(), 250)

  function dispatch(obj: Partial<ApiQuery>) {
    setQuery({ ...query, ...obj })
  }

  return [query, dispatch, debouncedUrl]
}
