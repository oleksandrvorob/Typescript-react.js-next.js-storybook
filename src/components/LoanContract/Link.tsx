import { Link } from '@material-ui/core'

export default (row) => (
  <Link href={`/loan-contract/${row?.id}`} variant="subtitle2" onClick={(e) => e.stopPropagation()}>
    {row?.id}
  </Link>
)
