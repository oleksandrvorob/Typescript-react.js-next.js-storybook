import { FunctionComponent } from 'react'
import { Controller, useForm } from 'react-hook-form'
import _pickBy from 'lodash/pickBy'
import { useSession } from 'next-auth/client'

import SendIcon from '@material-ui/icons/Send'
import Button from '@material-ui/core/Button'
import { makeStyles, Theme } from '@material-ui/core/styles'

import DatePicker from 'components/fields/DatePicker'

import { DrawRequest } from 'lib/interfaces'
// import useUser from 'lib/useUser'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10),
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
    [theme.breakpoints.up('sm')]: {
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
    },
    [theme.breakpoints.up('lg')]: {
      paddingLeft: theme.spacing(20),
      paddingRight: theme.spacing(20),
    },
  },
  formColumn: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  formRow: {
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}))

interface FormData {
  disbursedDate: Date
  inspectionFee: number
  wireFee: number
  status: string
}

interface Props {
  onSubmit: (data: Partial<DrawRequest>) => void
  status: string
  disbursedDate: Date
}

const DisbursementForm: FunctionComponent<Props> = ({ disbursedDate, onSubmit }) => {
  const { register, handleSubmit, errors, control } = useForm<FormData>({
    defaultValues: {
      disbursedDate,
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
        <Controller
          as={
            <DatePicker
              disableFuture
              inputRef={register}
              label="Date Disbursed"
              error={Boolean(errors?.disbursedDate)}
              disabled={!canFund}
            />
          }
          rules={{ required: true }}
          defaultValue={new Date()}
          name="disbursedDate"
          valueName="value"
          control={control}
        />
        <Button
          data-testid="disbursement-form-button"
          color="primary"
          endIcon={<SendIcon htmlColor="#fff">send</SendIcon>}
          disabled={!canFund}
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
