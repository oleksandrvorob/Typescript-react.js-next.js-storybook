import { FunctionComponent } from 'react'

import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

import { formatMoney } from 'lib/utils'

import { makeStyles, Theme } from '@material-ui/core/styles'

interface Props {
  fundedTotal: number
  reimbursedTotal: number
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& > *': {
      paddingBottom: theme.spacing(1.5),
      paddingTop: theme.spacing(1.5),
    },
  },
}))

const Balance: FunctionComponent<Props> = ({ fundedTotal, reimbursedTotal }) => {
  const classes = useStyles()
  const remaining = reimbursedTotal - fundedTotal

  return (
    <>
      <TableRow className={classes.root}>
        <TableCell rowSpan={3} colSpan={3} style={{ borderBottom: 'none' }} />
        <TableCell style={{ borderBottom: 'none' }}>Total Funded</TableCell>
        <TableCell align="right" style={{ borderBottom: 'none' }}>
          {formatMoney(fundedTotal) || '$0.00'}
        </TableCell>
      </TableRow>
      <TableRow className={classes.root}>
        <TableCell>Total Reimbursed</TableCell>
        <TableCell align="right">{formatMoney(reimbursedTotal) || '$0.00'}</TableCell>
      </TableRow>
      <TableRow className={classes.root}>
        <TableCell style={{ borderBottom: 'none' }}>
          <strong>Net</strong>
        </TableCell>
        <TableCell align="right" style={{ borderBottom: 'none' }}>
          {formatMoney(remaining)}
        </TableCell>
      </TableRow>
    </>
  )
}

export default Balance
