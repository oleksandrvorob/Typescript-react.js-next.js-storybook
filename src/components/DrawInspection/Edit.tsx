import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import _pickBy from 'lodash/pickBy'
import isValid from 'date-fns/isValid'
import parseISO from 'date-fns/parseISO'

import { Button, DialogActions, TextField, Switch, FormControlLabel } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import SendIcon from '@material-ui/icons/Send'

import Stack from 'components/Stack'
import DatePicker from 'components/fields/DatePicker'

import { Inspection } from 'lib/interfaces'

interface FormData {
  approved: boolean
  receivedDate: Date
  orderedDate: Date
  inspectionDate: Date
  completePercentage: number
}

interface Props extends Omit<FormData, 'approved'> {
  inspectionId: string
  status: string
  onSubmit: (data: Partial<Inspection>) => void
}

const InspectionForm = ({ inspectionId, status, onSubmit, ...dates }: Props) => {
  const { control, register, handleSubmit, errors, getValues } = useForm<FormData>({
    defaultValues: { approved: status === 'approved', ...dates },
  })

  const preSubmit = (incomingData: FormData) => {
    const data = _pickBy(incomingData, (x) => !!x)

    if (data?.approved === true) {
      data['approvedDate'] = new Date()
      data['status'] = 'approved'
    } else {
      data['approvedDate'] = null
      if (status === 'approved') {
        data['status'] = 'received'
      }
    }

    onSubmit({ ...data } as Inspection)
  }

  const validateApproval = (x) => {
    if (!!x) {
      const { inspectionDate, receivedDate, completePercentage } = getValues()

      // The date picker returns strings, but Typescript is expecting dates
      // @ts-ignore
      const p1 = isValid(parseISO(inspectionDate)) || isValid(inspectionDate)
      // @ts-ignore
      const p2 = isValid(parseISO(receivedDate)) || isValid(receivedDate)
      const p3 = completePercentage > 0

      return p1 && p2 && p3
    }

    return true
  }

  return (
    <form onSubmit={handleSubmit(preSubmit)}>
      <Stack>
        {!!errors?.approved && (
          <Alert variant="outlined" severity="error">
            Cannot approve inspection without <strong>received date</strong>, <br />
            <strong>inspection date</strong> and <strong>completion percentage</strong>.
          </Alert>
        )}

        <Controller
          as={
            <DatePicker
              inputRef={register({ required: true })}
              label="Date Received"
              error={Boolean(errors?.receivedDate)}
              helperText={errors.receivedDate && 'Date is required.'}
            />
          }
          // defaultValue={new Date()}
          name="receivedDate"
          valueName="value"
          control={control}
        />
        <Controller
          as={
            <DatePicker
              inputRef={register({ required: true })}
              label="Date Inspected"
              error={Boolean(errors?.receivedDate)}
              helperText={errors.receivedDate && 'Date is required.'}
            />
          }
          name="inspectionDate"
          valueName="value"
          control={control}
        />

        <TextField
          name="completePercentage"
          label="Complete %"
          inputRef={register({ validate: (x: number) => 0 <= x && x <= 100 })}
          inputProps={{
            step: 0.01,
            min: 0,
            max: 100,
            type: 'number',
            'aria-labelledby': 'input-slider',
          }}
          variant="outlined"
        />
        <Controller
          name="approved"
          control={control}
          render={({ onChange, value }) => (
            <FormControlLabel
              control={
                <Switch
                  onChange={(_, v) => onChange(v)}
                  checked={value}
                  name="approved"
                  color="primary"
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
              }
              label="Approved"
            />
          )}
          rules={{ validate: validateApproval }}
        />
      </Stack>

      <DialogActions>
        <Button variant="text" color="primary" startIcon={<SendIcon />} type="submit">
          Submit
        </Button>
      </DialogActions>
    </form>
  )
}

export default InspectionForm
