import { Link } from '@material-ui/core'

export default (row) => (
  <Link href={`/fci/${row?.loanId}`} variant="subtitle2" onClick={(e) => e.stopPropagation()}>
    {row?.loanId}
  </Link>
)
