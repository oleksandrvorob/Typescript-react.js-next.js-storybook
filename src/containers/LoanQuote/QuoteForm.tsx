import { FC, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'

// Mui fields
import { makeStyles, Theme } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

// internal fields
import SelectField from 'components/fields/SelectField'
import CurrencyField from 'components/fields/Currency'
import PercentageField from 'components/fields/PercentageField'

import { getFloat, formatMoney } from 'lib/utils'

import { LoanQuote } from 'entities/LoanQuote'

// TODO: perhaps a lot of these should be made into SQL tables
const ficoOptions = [
  { value: '700+', label: '700+' },
  { value: '650-699', label: '650-699' },
  { value: '600-649', label: '600-649' },
]

const transactionOptions = [
  { value: 'Purchase', label: 'Purchase' },
  { value: 'Refinance', label: 'Refinance' },
]

const YesNo = [
  { value: 0, label: 'No' },
  { value: 1, label: 'Yes' },
]

const stateAbbreviations = [
  'AL',
  'AK',
  'AS',
  'AZ',
  'AR',
  'CA',
  'CO',
  'CT',
  'DE',
  'DC',
  'FM',
  'FL',
  'GA',
  'GU',
  'HI',
  'ID',
  'IL',
  'IN',
  'IA',
  'KS',
  'KY',
  'LA',
  'ME',
  'MH',
  'MD',
  'MA',
  'MI',
  'MN',
  'MS',
  'MO',
  'MT',
  'NE',
  'NV',
  'NH',
  'NJ',
  'NM',
  'NY',
  'NC',
  'ND',
  'MP',
  'OH',
  'OK',
  'OR',
  'PW',
  'PA',
  'PR',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VT',
  'VI',
  'VA',
  'WA',
  'WV',
  'WI',
  'WY',
]

const propertyTypeOptions = ['SFR', 'MFR', 'Condo', 'Other', 'Commercial Mixed Use', 'Land']

const useStyles = makeStyles((theme: Theme) => ({
  row: {
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}))

interface Props {
  onSubmit?: (data: Partial<LoanQuote>) => void
}

const QuoteForm: FC<Props> = ({
  // put a default in here to just log
  onSubmit = (data) => {
    console.log(data)
  },
}) => {
  const classes = useStyles()

  const { register, handleSubmit, watch, control } = useForm<Partial<LoanQuote>>()

  const values = watch()

  const totalLoanAmount =
    getFloat(values?.baseLoanAmount || '0') + getFloat(values?.estimatedRehabAmount || '0')
  // this form will not have a submit button
  // instead, for every change we are actually going to submit
  // NOTE: this also means we need to be careful to debounce wherever this is going!!
  useEffect(() => {
    onSubmit(values)
  }, [JSON.stringify(values)])

  return (
    <form onSubmit={handleSubmit((data) => alert(JSON.stringify(data)))}>
      <div className={classes.column}>
        <Typography variant="h6">Flip Information</Typography>
        <div className={classes.column}>
          <Box display="flex" alignItems="center" className={classes.row}>
            {/* Property State */}
            <Controller
              name="propertyState"
              control={control}
              as={(props) => (
                <SelectField
                  menuItems={stateAbbreviations.map((item) => ({ value: item, label: item }))}
                  value={props.value}
                  onChange={(e) => props.onChange(e.target.value)}
                  label="State"
                />
              )}
            />

            {/* Property Type */}
            <Controller
              name="propertyType"
              control={control}
              as={(props) => (
                <SelectField
                  menuItems={propertyTypeOptions.map((item) => ({ value: item, label: item }))}
                  value={props.value}
                  onChange={(e) => props.onChange(e.target.value)}
                  label="Property Type"
                />
              )}
            />

            {/* FICO */}
            <Controller
              name="fico"
              control={control}
              as={(props) => (
                <SelectField
                  menuItems={ficoOptions}
                  label="Est. FICO Score"
                  required
                  autoWidth
                  value={props.value}
                  onChange={(e) => props.onChange(e.target.value)}
                />
              )}
            />
          </Box>

          <Box display="flex" alignItems="center" className={classes.row}>
            {/* Transaction Type */}
            <Controller
              name="transactionType"
              control={control}
              as={(props) => (
                <SelectField
                  menuItems={transactionOptions}
                  label="Transaction Type"
                  required
                  autoWidth
                  value={props.value}
                  onChange={(e) => props.onChange(e.target.value)}
                />
              )}
            />
            <CurrencyField
              label="Purchase Price"
              variant="filled"
              fullWidth={false}
              inputRef={register({ required: true })}
              name="purchasePrice"
            />
            <CurrencyField
              name="baseLoanAmount"
              label="Loan Amount"
              variant="filled"
              fullWidth={false}
              inputRef={register({ required: true })}
            />
          </Box>
          <Box display="flex" alignItems="center" className={classes.row}>
            {/* Rehab Required */}
            <Controller
              name="rehabRequired"
              control={control}
              as={(props) => (
                <SelectField
                  menuItems={YesNo}
                  label="Rehab Required"
                  required
                  autoWidth
                  value={props.value}
                  onChange={(e) => props.onChange(e.target.value)}
                />
              )}
            />
            <CurrencyField
              name="estimatedRehabAmount"
              label="Est. Cost of Rehab"
              variant="filled"
              fullWidth={false}
              inputRef={register({ required: true })}
            />
            <CurrencyField
              name="afterRepairValue"
              label="After Repair Value"
              variant="filled"
              fullWidth={false}
              inputRef={register({ required: true })}
            />
          </Box>
        </div>
        <Typography variant="subtitle2">
          Total Loan Amount: {formatMoney(totalLoanAmount)}
        </Typography>
        <div className={classes.column}>
          <Typography variant="h6">Broker Origination Compensation</Typography>
          <PercentageField
            label="Broker Points"
            variant="filled"
            style={{ width: 'max-content' }}
            inputRef={register({ required: true })}
          />
        </div>
      </div>
    </form>
  )
}

export default QuoteForm
