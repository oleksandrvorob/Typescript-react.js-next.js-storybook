import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

export default ({ colCount, emptyRowCount }) => (
  <>
    {Array.apply(null, Array(emptyRowCount)).map((_, idx) => (
      <TableRow style={{ height: 53 }} key={idx}>
        <TableCell colSpan={colCount} style={{ border: 0 }} />
      </TableRow>
    ))}
  </>
)
