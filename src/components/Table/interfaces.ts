import { ApiQuery } from 'lib/interfaces'
import { Filter, SetFilters } from '../Table-Toolbar/types'

export interface TableProps {
  title: string
  columns: any
  rows: Record<string, any>[]
  rowCount: number
  query: Partial<ApiQuery>
  setQuery: Function
  loading: boolean
  filters: Filter[]
  setFilters: SetFilters
  customComponents?: Record<string, Function>
  includeToolBar?: boolean
  expansionComponent?: Function
}
