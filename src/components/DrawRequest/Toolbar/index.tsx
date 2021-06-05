import { FunctionComponent, Dispatch, SetStateAction } from 'react'

import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import Search from '@material-ui/icons/Search'

import { Filter } from 'components/Table-Toolbar/types'

import AddFilters from 'components/AddFilters'
import DrawRequestForm from 'components/forms/DrawRequestForm'
import MultipleSelection from './MultipleSelection'
import HideArchived from './HideArchived'

import { Column } from 'lib/interfaces'

import { makeStyles, Theme } from '@material-ui/core/styles'

interface Props {
  filters: Filter[]
  setFilters: Dispatch<SetStateAction<Filter[]>>
  searchTerm: string
  setSearchTerm: (x: string) => void
  columns: Column[]
  onSuccess: () => void
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.down('md')]: {
      '& > *+*': {
        marginBottom: theme.spacing(1),
      },
      flexDirection: 'column-reverse',
      justifyContent: 'flex-start',
    },
  },
  form: {
    [theme.breakpoints.up('lg')]: {
      marginLeft: 'auto',
    },
    '& > *+*': {
      marginLeft: theme.spacing(0.5),
    },
  },
  spaced: {
    '& > *+*': {
      marginLeft: theme.spacing(0.5),
    },
  },
}))

const Toolbar: FunctionComponent<Props> = ({
  filters,
  setFilters,
  searchTerm,
  setSearchTerm,
  columns,
  onSuccess,
}) => {
  const classes = useStyles()

  const handleChange = (event) => {
    setSearchTerm(event.target.value)
  }

  return (
    <Box display="flex" className={classes.root}>
      {/* <FilterChips filters={filters} setFilters={setFilters} /> */}
      <MultipleSelection setFilters={setFilters} filters={filters} />
      <Box display="flex" alignItems="center" className={classes.form}>
        <TextField
          variant="outlined"
          label="Address"
          value={searchTerm}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <AddFilters filters={filters} setFilters={setFilters} columns={columns} />
        <DrawRequestForm onSuccess={onSuccess} />
        <HideArchived setFilters={setFilters} filters={filters} />
      </Box>
    </Box>
  )
}

export default Toolbar
