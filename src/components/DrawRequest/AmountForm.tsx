import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import _pickBy from 'lodash/pickBy'
import { useSession } from 'next-auth/client'

import SendIcon from '@material-ui/icons/Send'
import Button from '@material-ui/core/Button'
import { makeStyles, Theme } from '@material-ui/core/styles'

import Currency from 'components/fields/Currency'

import { DrawRequest } from 'lib/interfaces'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10),
    flexDirection: 'column',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}))

const DisbursementForm: FC<{
  requestedAmount: number
  onSubmit: (data: Partial<DrawRequest>) => void
}> = ({ requestedAmount, onSubmit }) => {
  const { register, handleSubmit, errors } = useForm<{ requestedAmount: number }>({
    defaultValues: {
      requestedAmount,
    },
  })
  const classes = useStyles()
  const [session] = useSession()
  const { user } = session

  const canFund = Boolean(
    // @ts-ignore
    (user && user?.permissions && user.permissions.includes('Account')) ||
      // @ts-ignore
      user.permissions.includes('Exec'),
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.root}>
        <Currency
          name="requestedAmount"
          inputRef={register({ required: true })}
          label="Requested Amount"
          variant="outlined"
          error={Boolean(errors?.requestedAmount)}
        />

        <Button
          data-testid="disbursement-form-button"
          color="primary"
          endIcon={<SendIcon htmlColor="#fff">send</SendIcon>}
          type="submit"
          variant="contained"
          size="large"
          style={{ color: 'white' }}
        >
          Submit
        </Button>
      </div>
    </form>
  )
}

export default DisbursementForm
