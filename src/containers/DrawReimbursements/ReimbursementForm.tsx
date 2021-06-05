import React, { ReactElement } from 'react'
import { Controller, useForm } from 'react-hook-form'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import { makeStyles, Theme } from '@material-ui/core/styles'

import Address from 'components/Address'
import DatePicker from 'components/fields/DatePicker'
import Currency from 'components/fields/Currency'
import StatX from 'components/atoms/StatX'

import { LoanContract } from 'entities/LoanContract'
import { DrawRequestReimbursement } from 'entities/DrawRequestReimbursement'

import { getFloat, formatMoney } from 'lib/utils'

interface Props {
  loanContract: LoanContract
  onCancel: () => void
  onSubmit: (data: Partial<DrawRequestReimbursement>) => void
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
    margin: theme.spacing(1),
  },
  buttons: {
    display: 'flex',
    flexDirection: 'column',
    '& > * + *': {
      marginTop: theme.spacing(1),
    },
  },
}))

function ReimbursementForm({ loanContract, onCancel, onSubmit }: Props): ReactElement {
  const classes = useStyles()
  const { control, errors, handleSubmit, register } = useForm({
    defaultValues: { reimbursedDate: null, amount: null },
  })

  const reducer = (accumulator, currentValue) => accumulator + getFloat(currentValue)
  const totalFunded = loanContract.drawRequests.map((x) => x.approvedAmount).reduce(reducer, 0)
  const totalReimbursed =
    loanContract.reimbursements.map((x) => x.amount).reduce(reducer, 0) || '$0.00'

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        display="flex"
        flexDirection="column"
        mx="24px"
        marginBottom="32px"
        className={classes.buttons}
      >
        <Address address={loanContract.address} />
        <StatX label="LID" value={loanContract.lid} />
        <StatX label="Funded To Date" value={formatMoney(totalFunded)} />
        <StatX label="Reimbursed To Date" value={formatMoney(totalReimbursed)} />
      </Box>

      <Box display="flex" flexDirection="column" maxWidth="256" className={classes.root}>
        <Controller
          render={({ value, onChange }) => (
            <DatePicker
              value={value}
              onChange={onChange}
              label="Date Reimbursment Received"
              helperText={errors.reimbursedDate && 'Date is required.'}
              error={Boolean(errors?.reimbursedDate)}
            />
          )}
          helperText={'date is required'}
          rules={{ required: true }}
          name="reimbursedDate"
          control={control}
        />
        <Currency
          inputRef={register({ required: true })}
          label="Amount Reimbursed"
          variant="outlined"
          name="amount"
          error={Boolean(errors?.amount)}
          helperText={errors.amount && 'Amount is required.'}
        />
        <Box className={classes.buttons} display="flex" flexDirection="column">
          <Button variant="contained" onClick={() => onCancel()}>
            Cancel
          </Button>
          <Button type="submit" color="primary" variant="contained">
            Submit
          </Button>
        </Box>
      </Box>
    </form>
  )
}

export default ReimbursementForm
