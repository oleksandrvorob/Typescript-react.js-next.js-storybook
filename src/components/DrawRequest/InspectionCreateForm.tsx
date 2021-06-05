import { FunctionComponent } from 'react'
import SendIcon from '@material-ui/icons/Send'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Button, DialogActions } from '@material-ui/core'
import { Controller, useForm } from 'react-hook-form'

import DatePicker from 'components/fields/DatePicker'
import InspectionVendorField from 'components/fields/InspectionVendorField'

import { Inspection, InspectionVendor } from 'lib/interfaces'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
    margin: theme.spacing(3),
  },
}))

interface Props {
  onSubmit: (data: Partial<Inspection>) => void
  onCancel: () => void
}

interface Form {
  orderedDate: Date
  eta: Date
  inspectionVendor: InspectionVendor
}

const InspectionForm: FunctionComponent<Props> = ({ onCancel, onSubmit }) => {
  const { control, register, handleSubmit, errors } = useForm<Form>()
  const classes = useStyles()

  const format = (data: Form) => {
    onSubmit({
      orderedDate: data.orderedDate,
      eta: data.eta,
      vendorId: data.inspectionVendor.id,
    })
  }

  return (
    <form onSubmit={handleSubmit(format)}>
      <div className={classes.root}>
        <Controller
          render={({ value, onChange }) => (
            <InspectionVendorField
              value={value}
              onChange={onChange}
              error={Boolean(errors?.inspectionVendor)}
            />
          )}
          name="inspectionVendor"
          control={control}
        />
        <Controller
          as={
            <DatePicker
              disableFuture
              inputRef={register({ required: true })}
              label="Date Requested"
              error={Boolean(errors?.orderedDate)}
              helperText={errors?.orderedDate && 'Date is required.'}
            />
          }
          defaultValue={new Date()}
          name="orderedDate"
          valueName="value"
          control={control}
        />
        <Controller
          as={
            <DatePicker
              inputRef={register({ required: true })}
              label="ETA"
              error={Boolean(errors?.eta)}
              helperText={errors?.eta && 'Date is required.'}
            />
          }
          // Set ETA to 5 days from today
          defaultValue={new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)}
          name="eta"
          valueName="value"
          control={control}
        />
      </div>
      <DialogActions>
        <Button onClick={() => onCancel()}>Cancel</Button>
        <Button variant="text" color="primary" startIcon={<SendIcon />} type="submit">
          Submit
        </Button>
      </DialogActions>
    </form>
  )
}

export default InspectionForm
