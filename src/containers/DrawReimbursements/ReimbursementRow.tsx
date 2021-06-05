import { FunctionComponent, useState } from 'react'

// mui components
import Box from '@material-ui/core/Box'
import Collapse from '@material-ui/core/Collapse'
import Fab from '@material-ui/core/Fab'
import IconButton from '@material-ui/core/IconButton'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

// mui icons
import AddIcon from '@material-ui/icons/Add'
import ArchiveTwoToneIcon from '@material-ui/icons/ArchiveTwoTone'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'

// entities
import { LoanContract } from 'entities/LoanContract'

// components
import Address from 'components/Address'
import AddressAlternate from 'components/AddressAlternate'
import Progress from 'components/Progress'
import Statistic from 'components/Statistic'
import OutlinedFab from 'components/atoms/OutlinedFab'

import ReimbursementHistory from './ReimbursementHistory'
import { useDrawReimbursementStore } from 'stores/DrawReimbursementStore'

import { getFloat, formatMoney } from 'lib/utils'

import { makeStyles, Theme } from '@material-ui/core/styles'

interface Props {
  loanContract: LoanContract
  onClick?: () => void
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  buttons: {
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}))

const ReimbursementRow: FunctionComponent<Props> = ({ loanContract, onClick }) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const { loanContractData } = useDrawReimbursementStore()

  const { closeLoan } = loanContractData

  const reducer = (accumulator, currentValue) => accumulator + getFloat(currentValue)
  const totalFunded = loanContract.drawRequests.map((x) => x.approvedAmount).reduce(reducer, 0)
  const totalReimbursed =
    loanContract.reimbursements.map((x) => x.amount).reduce(reducer, 0) || '$0.00'

  return (
    <>
      <TableRow className={classes.root}>
        <TableCell>
          {!!loanContract.address ? (
            <Address address={loanContract.address} />
          ) : (
            <AddressAlternate loanContract={loanContract} />
          )}
        </TableCell>
        <TableCell>
          <Statistic primary={loanContract.lid} secondary="LID" />
        </TableCell>
        {/* <TableCell>
          <Statistic primary={getTimeStamp(drawRequest.disbursedDate)} secondary="Funded Date" />
        </TableCell> */}
        <TableCell style={{ maxWidth: '160px' }}>
          <Statistic
            primary={`${formatMoney(totalReimbursed)} / ${formatMoney(totalFunded)}`}
            // @ts-ignore
            secondary={<Progress value={totalReimbursed / totalFunded || 0} />}
          />
        </TableCell>
        <TableCell style={{ minWidth: '100px' }}></TableCell>
        <TableCell>
          <Box display="flex" alignItems="center" className={classes.buttons}>
            <Fab color="primary" onClick={() => onClick()}>
              <AddIcon />
            </Fab>
            <OutlinedFab onClick={() => closeLoan(loanContract.id)}>
              <ArchiveTwoToneIcon />
            </OutlinedFab>
            {/* <IconButton
              aria-label="undo funding"
              onClick={() => undoFunding(drawRequest.id)}
              disabled={hasReimbursements}
            >
              <UndoIcon />
            </IconButton> */}
            <IconButton aria-label="expand row" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowRightIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </Box>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <ReimbursementHistory loanContract={loanContract} />
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

export default ReimbursementRow
