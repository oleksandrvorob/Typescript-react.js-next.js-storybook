import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { MenuItem, TextField, Typography } from '@material-ui/core'
import _isEmpty from 'lodash/isEmpty'

import Flex from 'components/Flex'
import { AddFilterProps, Operator } from './types'
import { useDebounce } from 'lib/hooks'

const Container = styled(Flex)`
  margin: 1.618em;
  > * + * {
    margin-top: 0.618em;
  }
`

const operators: Operator[] = [
  'is',
  'is not',
  'contains',
  'does not contain',
  'is null',
  'is not null',
]

const FilterItem = ({ columns, setFilter }) => {
  const [field, setField] = useState('')
  const [action, setAction] = useState('')
  const [value, setValue] = useState('')

  const debouncedPrefix = useDebounce(`${field}${action}`, 500)

  useEffect(() => {
    if (!!field && action.includes('null')) {
      // const trueAction = action.split(' ')
      setFilter((prev) => [...prev, { field, action, value }])
    }
  }, [debouncedPrefix])

  function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      if (!(_isEmpty(field) || _isEmpty(action) || _isEmpty(value))) {
        setFilter((prev) => [...prev, { field, action, value }])
      }
    }
  }

  return (
    <Flex>
      <div>
        <TextField
          select
          value={field}
          onChange={(event: React.ChangeEvent<{ value: unknown }>) =>
            setField(event.target.value as string)
          }
          label="Field"
          size="small"
          variant="outlined"
          style={{ width: 'fit-content', minWidth: '10ch' }}
          onKeyPress={handleKeyPress}
        >
          {columns.map(({ id, label }, idx) => (
            <MenuItem key={idx} value={id}>
              {label}
            </MenuItem>
          ))}
        </TextField>
      </div>

      <div>
        <TextField
          select
          label="Action"
          value={action}
          onChange={(event: React.ChangeEvent<{ value: unknown }>) =>
            setAction(event.target.value as string)
          }
          size="small"
          variant="outlined"
          style={{ width: 'fit-content', minWidth: '12ch' }}
          inputProps={{ onKeyPress: handleKeyPress }}
        >
          {operators.map((x, idx) => (
            <MenuItem key={idx} value={x}>
              {x}
            </MenuItem>
          ))}
        </TextField>
      </div>

      <div>
        <TextField
          label="Value"
          variant="outlined"
          size="small"
          value={value}
          onChange={(event: React.ChangeEvent<{ value: unknown }>) =>
            setValue(event.target.value as string)
          }
          style={{ width: 'fit-content', minWidth: '20ch' }}
          inputProps={{ onKeyPress: handleKeyPress }}
          disabled={action.includes('null')}
        />
      </div>
    </Flex>
  )
}

export default ({ setFilters, columns }: AddFilterProps) => {
  return (
    <Container direction="column">
      <Typography variant="h6">Add Filter</Typography>
      <div>
        <FilterItem columns={columns} setFilter={setFilters} />
      </div>
    </Container>
  )
}
