import { FC, MouseEvent } from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import {
  TableHead as MUITableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  Typography,
} from '@material-ui/core'
import Loader from '../Loader'

import { EnhancedTablePropsInterface } from './interfaces'
import { Column } from 'lib/interfaces'

const useStyles = makeStyles(() =>
  createStyles({
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
    borderHidden: {
      border: 0,
    },
    borderShowing: {
      borderBottom: '1px solid rgba(224, 224, 224, 1)',
    },
  }),
)

const TableHead: FC<{
  onRequestSort: (event: MouseEvent<unknown>, property: string) => void
  order?: 'asc' | 'desc'
  orderBy?: string
  columns: Object[]
  loading?: boolean
}> = ({ order = 'desc', orderBy = 'id', loading = false, onRequestSort, columns }) => {
  const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
    !!property && onRequestSort(event, property)
  }

  const classes = useStyles()

  return (
    <MUITableHead>
      <TableRow>
        {columns.map(({ id, label }: Column) => (
          <TableCell
            key={id}
            align="left"
            padding="default"
            sortDirection={orderBy === id ? order : false}
            className={classes.borderHidden}
          >
            {!!id ? (
              <TableSortLabel
                active={orderBy === id}
                direction={orderBy === id ? order : 'asc'}
                onClick={createSortHandler(id)}
              >
                <Typography variant="caption" color="textSecondary">
                  {label}
                </Typography>
                {orderBy === id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            ) : (
              <Typography variant="caption" color="textSecondary">
                {label}
              </Typography>
            )}
          </TableCell>
        ))}
      </TableRow>
      <tr style={{ height: 0, padding: 0, margin: 0 }}>
        {loading ? (
          <td colSpan={columns.length + 1} style={{ height: 0, padding: 0, margin: 0, border: 0 }}>
            <Loader />
          </td>
        ) : (
          <TableCell colSpan={columns.length + 1} style={{ height: 0, padding: 0, margin: 0 }} />
        )}
      </tr>
    </MUITableHead>
  )
}

export default TableHead
