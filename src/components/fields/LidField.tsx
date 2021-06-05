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

import Flex from 'components/Flex'

export default function Asynchronous(props) {
  const [inputValue, setInputValue] = React.useState('')
  const url = createQueryString('loancontract/search', [['search', inputValue]])

  const debouncedUrl = useDebounce(url, 800)

  const { data, error, isValidating: loading } = useSWR(inputValue && debouncedUrl)
  // const loading = inputValue && !data && !error

  const options = data?.rows ?? []

  return (
    <Autocomplete
      id="asynchronous-demo"
      fullWidth
      filterOptions={() => options}
      getOptionLabel={(x) => x.lid}
      style={{ minWidth: 300 }}
      value={props?.value ?? ''}
      onChange={(_e, val) => props?.onChange(val)}
      inputValue={inputValue}
      onInputChange={(_, v) => setInputValue(v)}
      options={options}
      loading={loading}
      getOptionSelected={({ id }) => id === inputValue}
      getOptionDisabled={(option) => option.active === false}
      PaperComponent={({ children, ...props }) => (
        <Paper elevation={5} {...props}>
          {children}
        </Paper>
      )}
      renderOption={(option) => (
        <Flex direction="column">
          <Divider flexItem />
          <Typography>{option?.lid}</Typography>
          <Typography variant="caption">{option?.fullAddress}</Typography>
        </Flex>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Loan Id"
          variant="outlined"
          error={props?.error}
          helperText={props?.error && 'Valid loan id is required.'}
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
