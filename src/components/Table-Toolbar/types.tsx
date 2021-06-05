import { Column } from 'lib/interfaces'

export type Operator = 'is' | 'is not' | 'contains' | 'does not contain' | 'is null' | 'is not null'
export type FieldType = 'STRING' | 'NUMBER' | 'DATE'

export interface Filter {
  field: string
  action: string
  value: string
}

export interface Field {
  id?: string
  name?: string
  type?: FieldType
}

type StateCallBack = (prevState: Filter[]) => Filter[]

export type SetFilters = (cb: StateCallBack | Filter[]) => void

export interface AddFilterProps {
  setFilters: SetFilters
  columns: Column[]
}

export interface FilterChipsProps {
  filters: Filter[]
  setFilters: SetFilters
}

export interface FilterPopoverProps extends AddFilterProps {
  id: string | undefined
  open: boolean
  anchorEl: HTMLElement
  handleClose(): void
}

export interface TableToolbarProps extends AddFilterProps {
  title: string
  searchTerm?: string
  setSearchTerm?: (x: string) => void
  filters: Filter[]
}
