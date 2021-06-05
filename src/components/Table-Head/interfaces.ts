type Order = 'asc' | 'desc'

export interface EnhancedTablePropsInterface {
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void
  order: Order
  orderBy: string
  rowCount: number
  columns: Object[]
  loading: boolean
}
