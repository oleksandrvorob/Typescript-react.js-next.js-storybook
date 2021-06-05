import { FunctionComponent } from 'react'
import { useForm } from 'react-hook-form'
import _pickBy from 'lodash/pickBy'
import { useSession } from 'next-auth/client'

import SendIcon from '@material-ui/icons/Send'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import { makeStyles, Theme } from '@material-ui/core/styles'

import Currency from 'components/fields/Currency'

import { getFloat } from 'lib/utils'
import { DrawRequest } from 'lib/interfaces'
import NoPermission from 'components/atoms/NoPermission'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
    [theme.breakpoints.up('md')]: {
      paddingLeft: '25%',
      paddingRight: '25%',
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '10%',
      paddingRight: '10%',
    },
  },
  formRow: {
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}))

const getMessage = (val: number, eligible: number) => {
  val = val || 0
  if (val <= 0) {
    return 'Amount must exceed $0.'
  } else if (val > eligible) {
    return `Amount cannot exceed ${eligible}`
  }
}

interface FormData {
  approvedAmount: string
  inspectionFee: string
  wireFee: string
}

interface Props extends FormData {
  requestedAmount: string
  status: string
  eligibleDisbursementAmount: number
  onSubmit: (data: Partial<DrawRequest>) => void
}

const ApprovalForm: FunctionComponent<Props> = ({
  requestedAmount,
  approvedAmount,
  inspectionFee,
  wireFee,
  eligibleDisbursementAmount,
  status,
  onSubmit,
}) => {
  const { register, handleSubmit, errors, getValues } = useForm<FormData>({
    defaultValues: {
      approvedAmount,
      inspectionFee,
      wireFee,
    },
  })
  const classes = useStyles()
  const [session] = useSession()
  const { user } = session

  // @ts-ignore
  const canApprove = Boolean(user && user?.permissions && user.permissions.includes('exec'))
  const approvalNeeded = status === 'inspection approved' && (getFloat(approvedAmount) || 0) > 0

  const preSubmit = (data: Partial<DrawRequest>) => {
    // If amount is valid, go ahead and approve
    if (!!data?.approvedAmount) {
      const num = getFloat(data.approvedAmount)
      const validAmount = 1 <= num && num <= Math.ceil(eligibleDisbursementAmount)

      if (validAmount || canApprove) {
        data['approvedDate'] = new Date()
        data['status'] = 'approved'
      }
    }

    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit(preSubmit)}>
      <Box display="flex" flexDirection="column" justifyContent="center" className={classes.root}>
        <Box display="flex" className={classes.formRow}>
          <Currency
            name="inspectionFee"
            inputRef={register({ required: true })}
            label="Inspection Fee"
            variant="outlined"
            error={Boolean(errors?.inspectionFee)}
          />
          <Currency
            name="wireFee"
            inputRef={register({ required: true })}
            label="Wire Fee"
            variant="outlined"
            error={Boolean(errors?.wireFee)}
          />
        </Box>
        <Currency
          name="approvedAmount"
          inputRef={register({ validate: (x) => getFloat(x) <= getFloat(requestedAmount) })}
          InputProps={
            approvalNeeded && !canApprove
              ? {
                  endAdornment: <NoPermission />,
                }
              : null
          }
          disabled={!canApprove && approvalNeeded}
          label="Approved Amount"
          variant="outlined"
          error={Boolean(errors?.approvedAmount)}
          helperText={
            errors?.approvedAmount &&
            getMessage(getFloat(getValues('approvedAmount')), eligibleDisbursementAmount)
          }
        />
        <Button
          data-testid="approval-form-button"
          disabled={!canApprove && approvalNeeded}
          color="primary"
          startIcon={<SendIcon htmlColor="#fff">send</SendIcon>}
          type="submit"
          variant="contained"
          size="large"
          style={{ color: 'white' }}
        >
          Approve
        </Button>
      </Box>
    </form>
  )
}

export default ApprovalForm
