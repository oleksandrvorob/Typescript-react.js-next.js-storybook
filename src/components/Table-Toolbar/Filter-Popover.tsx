import { Popover } from '@material-ui/core'
import AddFilter from './Add-Filter'

import { FilterPopoverProps } from './types'

export default ({ id, open, anchorEl, handleClose, setFilters, columns }: FilterPopoverProps) => (
  <Popover
    id={id}
    open={open}
    anchorEl={anchorEl}
    onClose={handleClose}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
  >
    <AddFilter setFilters={setFilters} columns={columns} />
  </Popover>
)
