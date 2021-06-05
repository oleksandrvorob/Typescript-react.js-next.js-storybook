export type Order = 'asc' | 'desc'
export type NullFilter = 'is null' | 'is not null'
export type Filter = 'is' | 'is not' | 'contains' | 'does not contain' | NullFilter
export type Query = {
  [key: string]: string | string[]
}
