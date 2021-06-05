import { FunctionComponent } from 'react'
import MUITableCell, { TableCellProps } from '@material-ui/core/TableCell'

const TableCell: FunctionComponent<TableCellProps> = ({ children, ...props }) => (
  <MUITableCell {...props} style={{ borderBottom: 'none' }}>
    {children}
  </MUITableCell>
)

export default TableCell
