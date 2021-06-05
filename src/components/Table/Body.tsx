import TableBody from '@material-ui/core/TableBody'
import Row from './Row'
import EmptyRow from '../Empty-Row'

export default ({
  rows,
  columns,
  emptyRows,
  isSelected,
  handleClick,
  customComponents = {},
  expansionComponent,
}) => (
  <TableBody style={{ border: 0 }}>
    {rows.map((row, index) => {
      const isItemSelected = isSelected(row.id)
      const labelId = `enhanced-table-checkbox-${index}`

      return (
        <Row
          key={labelId}
          columns={columns}
          row={row}
          handleClick={handleClick}
          isSelected={isItemSelected}
          labelId={labelId}
          customComponents={customComponents}
          expansionComponent={expansionComponent}
        />
      )
    })}
    {emptyRows > 0 && <EmptyRow colCount={columns.length + 1} emptyRowCount={emptyRows} />}
  </TableBody>
)
