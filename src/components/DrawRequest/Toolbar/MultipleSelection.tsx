import { FunctionComponent, Dispatch, SetStateAction, MouseEvent, useState } from 'react'

import Box from '@material-ui/core/Box'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'

import { Filter } from 'components/Table-Toolbar/types'

interface Props {
  filters: Filter[]
  setFilters: Dispatch<SetStateAction<Filter[]>>
}

const MultipleSelection: FunctionComponent<Props> = ({ filters, setFilters }) => {
  const statuses = filters
    .filter((item) => item.field === 'status' && item.action === 'is')
    .map((item) => item.value)

  const handleFormat = (_event: MouseEvent<HTMLElement>, newStatuses: string[]) => {
    if (newStatuses.length > statuses.length) {
      const value = newStatuses.filter((x) => !statuses.includes(x))?.[0]
      setFilters((x) => [...x, { field: 'status', action: 'is', value }])
    } else if (statuses.length > newStatuses.length) {
      const value = statuses.filter((x) => !newStatuses.includes(x))?.[0]
      console.log(value)

      setFilters((x) =>
        x.filter(
          (item) => !(item.action === 'is' && item.field === 'status' && item.value === value),
        ),
      )
    }
  }

  return (
    <ToggleButtonGroup
      value={statuses}
      onChange={handleFormat}
      aria-label="text formatting"
      color="primary"
      style={{ background: 'transparent' }}
    >
      <ToggleButton value="new" aria-label="new">
        <Box display="flex" justifyContent="baseline">
          New
        </Box>
      </ToggleButton>
      <ToggleButton value="inspection ordered" aria-label="inspection ordered">
        Inspection Ordered
      </ToggleButton>
      <ToggleButton value="inspection approved" aria-label="inspection approved">
        Inspection Approved
      </ToggleButton>
      <ToggleButton value="approved" aria-label="approved">
        Approved
      </ToggleButton>
      <ToggleButton value="funded" aria-label="funded">
        Funded
      </ToggleButton>
    </ToggleButtonGroup>
  )
}

export default MultipleSelection
