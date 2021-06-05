import React, { ReactElement } from 'react'
import parseISO from 'date-fns/parseISO'
import compareAsc from 'date-fns/compareAsc'

import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import UndoIcon from '@material-ui/icons/Undo'

import { getTimeStamp, getFloat, formatMoney } from 'lib/utils'

import { LoanContract } from 'entities/LoanContract'

import { makeStyles, Theme } from '@material-ui/core/styles'

interface Props {
  loanContract: LoanContract
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
}))

function ReimbursementHistory({ loanContract }: Props): ReactElement {
  const classes = useStyles()

  const { reimbursements, drawRequests } = loanContract

  const fundedDraws = drawRequests
    .filter((x) => ['funded', 'reimbursed'].includes(x.status))
    .map((x) => ({ amount: x.approvedAmount, date: x.drawDate || x.requestedDate }))

  const reimbursed = reimbursements.map((x) => ({
    amount: formatMoney(getFloat(x.amount) - getFloat(x.amount) * 2),
    date: x.reimbursedDate,
  }))

  const history = reimbursed.concat(fundedDraws)

  history.sort((a, b) =>
    compareAsc(parseISO((a?.date as any) as string), parseISO((b?.date as any) as string)),
  )

  // const { drawRequestData } = useAccountingStore()
  // const { deleteReimbursement } = drawRequestData

  return (
    <Box px={8} marginBottom={4}>
      <Typography gutterBottom component="div">
        History
      </Typography>
      <Table size="small" aria-label="purchases">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Undo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {history.map((item, idx) => (
            <TableRow key={idx} className={classes.root}>
              <TableCell component="th" scope="row">
                {getTimeStamp(item.date)}
              </TableCell>
              <TableCell align="right">{item.amount}</TableCell>
              <TableCell align="right">
                <IconButton size="small">
                  <UndoIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  )
}

export default ReimbursementHistory
