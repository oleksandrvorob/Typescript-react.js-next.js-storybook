import { useState } from 'react'

import { createStyles, makeStyles } from '@material-ui/core/styles'
import {
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  TextField,
  InputAdornment,
} from '@material-ui/core'
import { FilterList, Search } from '@material-ui/icons'

import Flex from '../Flex'
import FilterChips from './Filter-Chips'
import FilterPopover from './Filter-Popover'

import { TableToolbarProps, Filter } from './types'

const useToolbarStyles = makeStyles((theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
      paddingTop: theme.spacing(2),
      alignItems: 'baseline',
    },
    title: {
      flexShrink: 0,
    },
    grow: {
      marginRight: 'auto',
    },
  }),
)

export default ({
  title,
  searchTerm,
  setSearchTerm,
  filters = [],
  setFilters,
  columns,
}: TableToolbarProps) => {
  const classes = useToolbarStyles()
  const [anchorEl, setAnchorEl] = useState(null)

  const handleChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleAddFilter = (x: Filter[]) => {
    handleClose()
    setFilters(x)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <Toolbar className={classes.root}>
      <Flex align="center">
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          {title}
        </Typography>
        <FilterChips filters={filters} setFilters={setFilters} />
      </Flex>
      <div className={classes.grow} />
      <Flex align="center">
        <TextField
          label="Search"
          id="outlined-size-small"
          variant="outlined"
          size="small"
          value={searchTerm || ''}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list" onClick={handleClick}>
            <FilterList />
          </IconButton>
        </Tooltip>
        <FilterPopover
          id={id}
          open={open}
          anchorEl={anchorEl}
          handleClose={handleClose}
          setFilters={handleAddFilter}
          columns={columns}
        />
      </Flex>
    </Toolbar>
  )
}
