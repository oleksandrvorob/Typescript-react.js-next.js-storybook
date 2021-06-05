import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'

import Search from '@material-ui/icons/Search'

import { useDrawReimbursementStore } from 'stores/DrawReimbursementStore'

const Filters = () => {
  const { loanContractData } = useDrawReimbursementStore()

  const { query, setQuery } = loanContractData

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery({ searchTerm: event.target.value })
  }

  return (
    <TextField
      value={query.searchTerm}
      onChange={handleChange}
      size="small"
      id="search-address"
      variant="outlined"
      label="Address"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Search />
          </InputAdornment>
        ),
      }}
    />
  )
}

export default Filters
