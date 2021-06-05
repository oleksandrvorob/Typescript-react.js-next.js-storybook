import React from 'react'
import useSWR from 'swr'

import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import CircularProgress from '@material-ui/core/CircularProgress'

import Autocomplete from '@material-ui/lab/Autocomplete'

import { createQueryString } from 'lib/utils'
import { useDebounce } from 'lib/hooks'
import { InspectionVendor, InspectionVendorListResponse } from 'lib/interfaces'

import Flex from 'components/Flex'

interface Props {
  value?: InspectionVendor
  onChange?: (data: InspectionVendor) => void
  error: boolean
}

export default function Asynchronous({ value, onChange, error }) {
  const [inputValue, setInputValue] = React.useState('')
  const url = createQueryString('inspection-vendors', [['name', inputValue]])

  const debouncedUrl = useDebounce(url, 250)

  const { data, error: xhrError } = useSWR<InspectionVendorListResponse>(debouncedUrl)
  const loading = inputValue && !data && !xhrError

  const options = data?.inspectionVendors ?? []

  return (
    <Autocomplete
      id="asynchronous-autocomplete"
      fullWidth
      filterOptions={() => options}
      getOptionLabel={(x) => x?.name ?? ''}
      style={{ minWidth: 300 }}
      value={value || null}
      getOptionSelected={(x) => (x.id = value?.id)}
      onChange={(_e, val) => onChange(val)}
      inputValue={inputValue}
      onInputChange={(_, v) => setInputValue(v)}
      options={options}
      loading={inputValue && !data && !error}
      PaperComponent={({ children, ...props }) => (
        <Paper elevation={5} {...props}>
          {children}
        </Paper>
      )}
      renderOption={(option) => (
        <Flex direction="column">
          <Divider flexItem />
          <Typography>{option.name}</Typography>
        </Flex>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Vendor"
          variant="outlined"
          error={error}
          helperText={error && 'Vendor is a required field.'}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="primary" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  )
}
