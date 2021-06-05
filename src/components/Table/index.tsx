import { useState, MouseEvent } from 'react'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableContainer from '@material-ui/core/TableContainer'
import TablePagination from '@material-ui/core/TablePagination'
import Paper from '@material-ui/core/Paper'

import TableHead from 'components/Table-Head'
import TableToolbar from '../Table-Toolbar'

import Body from './Body'
import { TableProps } from './interfaces'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      marginTop: theme.spacing(5),
    },
    paper: {
      border: 'none',
    },
    table: {
      border: 'none',
    },
  }),
)

export default (props: TableProps) => {
  const {
    title,
    rows,
    rowCount,
    query,
    setQuery,
    loading,
    filters,
    setFilters,
    columns,
    customComponents = {},
    expansionComponent,
    includeToolBar = true,
  } = props
  const { order, orderBy, page, rowsPerPage, searchTerm } = query

  const classes = useStyles()
  const [selected, setSelected] = useState<number[]>([])
  const handleRequestSort = (_event: React.MouseEvent<unknown>, property: string) => {
    setQuery({
      orderBy: property,
      order: order === 'asc' ? 'desc' : 'asc',
      page: property === orderBy ? page : 0,
    })
  }

  const handleClick = (_event: MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id)
    let newSelected: number[] = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      )
    }

    setSelected(newSelected)
  }

  const handleChangePage = (_event: unknown, newPage: number) => {
    setQuery({ page: newPage })
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery({ rowsPerPage: parseInt(event.target.value), page: 0 })
  }

  const isSelected = (id: number) => selected.indexOf(id) !== -1

  const emptyRows = rowsPerPage - Math.max(Math.min(rowsPerPage, rowCount - page * rowsPerPage), 0)

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={1}>
        {includeToolBar && (
          <TableToolbar
            title={title}
            searchTerm={searchTerm}
            setSearchTerm={(x) => setQuery({ searchTerm: x, page: 0 })}
            filters={filters}
            columns={columns}
            setFilters={setFilters}
          />
        )}
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="small"
            aria-label="enhanced table"
          >
            <TableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              columns={columns}
              loading={loading}
            />
            <Body
              rows={rows}
              columns={columns}
              emptyRows={emptyRows}
              isSelected={isSelected}
              handleClick={handleClick}
              customComponents={customComponents}
              expansionComponent={expansionComponent}
            />
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={Number(rowCount)}
          rowsPerPage={Number(rowsPerPage)}
          page={Number(page)}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          nextIconButtonProps={loading ? { disabled: loading } : {}}
          backIconButtonProps={loading ? { disabled: loading } : {}}
        />
      </Paper>
    </div>
  )
}
