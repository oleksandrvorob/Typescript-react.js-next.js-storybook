import { MouseEvent } from 'react'
import { TableRow, TableCell, Checkbox } from '@material-ui/core'

import { Column } from 'lib/interfaces'

import DateComponent from 'components/Date'
import TimeStamp from 'components/TimeStamp'

interface Row {
  columns: Column[]
  row: Record<string, any>
  handleClick(event: MouseEvent<unknown>, id: number): void
  isSelected: boolean
  labelId: string
  customComponents?: Record<string, Function>
  expansionComponent?: Function
}

const Cell = ({ children, ...props }) => (
  <TableCell {...props} style={{ border: 'none', width: 'fit-content' }}>
    {children}
  </TableCell>
)

const Boolean = ({ checked }) => (
  <Checkbox disabled checked={checked} inputProps={{ 'aria-label': 'disabled checked checkbox' }} />
)

const SwitchComponent = (row, col, customComponents = {}) => {
  if (col.id in customComponents) {
    return customComponents?.[col.id](row)
  }

  switch (col?.type) {
    case 'date':
      return <DateComponent date={row?.[col.id]} />
    case 'timestamp':
      return <TimeStamp timestamp={row?.[col.id]} />
    case 'boolean':
      return <Boolean checked={row?.[col.id]} />
    default:
      return <>{row?.[col.id]}</>
  }
}

export default ({
  columns,
  row,
  handleClick,
  isSelected,
  customComponents = {},
  expansionComponent,
}: Row) => {
  return (
    <>
      <TableRow
        hover
        onClick={(event) => handleClick(event, row.id)}
        role="checkbox"
        aria-checked={isSelected}
        tabIndex={-1}
        key={row.id}
      >
        {columns.map((col, idx) => (
          <Cell key={idx} align="left">
            {SwitchComponent(row, col, customComponents)}
          </Cell>
        ))}
      </TableRow>
      <TableRow>
        {isSelected && expansionComponent ? (
          <TableCell
            colSpan={columns.length + 1}
            style={{ height: 0, padding: 0, margin: 0, background: 'rgba(250, 250, 250, 0.382)' }}
          >
            {expansionComponent({ ...row })}
          </TableCell>
        ) : (
          <TableCell colSpan={columns.length + 1} style={{ height: 0, padding: 0, margin: 0 }} />
        )}
      </TableRow>
    </>
  )
}
