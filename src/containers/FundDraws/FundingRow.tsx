import { FunctionComponent } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import TableRow from '@material-ui/core/TableRow'

import Address from 'components/Address'
import AddressAlternate from 'components/AddressAlternate'
import { DrawRequest } from 'entities/DrawRequest'
import DatePicker from 'components/fields/DatePicker'
import Statistic from 'components/Statistic'
import TableCell from 'components/TableCell'

import { getFloat, formatMoney } from 'lib/utils'

interface Props {
  drawRequest: DrawRequest
}

const FundingRow: FunctionComponent<Props> = ({ drawRequest }) => {
  const { control, errors, register } = useFormContext()

  const wireOut =
    getFloat(drawRequest.approvedAmount) -
    getFloat(drawRequest.wireFee) -
    getFloat(drawRequest.inspectionFee)

  return (
    <>
      <TableRow style={{ verticalAlign: 'top' }}>
        <TableCell>
          {drawRequest?.loanContract?.address ? (
            <Address address={drawRequest.loanContract.address} />
          ) : (
            <AddressAlternate loanContract={drawRequest.loanContract} />
          )}
        </TableCell>
        <TableCell>
          <Statistic
            primary={drawRequest.loanContract?.fci?.lenderName ?? 'Quanta Finance, LLC'}
            secondary="Assignment"
          />
        </TableCell>
        <TableCell>
          <Statistic primary={drawRequest.loanContract.borrowerName} secondary="Borrower" />
        </TableCell>
        <TableCell>
          <Statistic
            primary={`Draw No. ${drawRequest.drawNumber}`}
            secondary={`LID: ${drawRequest.loanContract.lid}`}
          />
        </TableCell>
        <TableCell>
          <Statistic primary={formatMoney(wireOut)} secondary="Wire Out Amount" />
        </TableCell>
        <TableCell>
          <Box display="flex" alignItems="center">
            <Controller
              as={<DatePicker label="Date Funded" />}
              defaultValue={null}
              name={`${drawRequest.id}`}
              valueName="value"
              control={control}
            />
            <Button
              style={{ marginLeft: '8px' }}
              // startIcon={<SendIcon />}
              variant="contained"
              color="primary"
              type="submit"
            >
              Save
            </Button>
          </Box>
        </TableCell>
      </TableRow>
    </>
  )
}

export default FundingRow
