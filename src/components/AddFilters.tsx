import { useState } from 'react'
import Fab from '@material-ui/core/Fab'
import Tooltip from '@material-ui/core/Tooltip'
import Badge from '@material-ui/core/Badge'
import { FilterList } from '@material-ui/icons'

import FilterPopover from 'components/Table-Toolbar/Filter-Popover'

export default ({ filters = [], setFilters, columns }) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleAddFilter = (x) => {
    handleClose()
    setFilters(x)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <>
      <Tooltip title="Add filters">
        <Badge color="primary" badgeContent={filters.length} overlap="circle">
          <Fab onClick={handleClick}>
            <FilterList />
          </Fab>
        </Badge>
      </Tooltip>

      <FilterPopover
        id={id}
        open={open}
        anchorEl={anchorEl}
        handleClose={handleClose}
        setFilters={handleAddFilter}
        columns={columns}
      />
    </>
  )
}
