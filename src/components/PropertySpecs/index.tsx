import styled from 'styled-components'
import { Typography } from '@material-ui/core'

import Flex from '../Flex'

const Stack = styled(Flex)`
  > * + * {
    margin-left: 8px;
  }
`

interface Specs {
  bedCount?: number | '-'
  bathCount?: number | '-'
  sqft?: number | '-'
}

export default ({ bedCount = '-', bathCount = '-', sqft = '-' }: Specs) => (
  <Stack align="baseline">
    <Typography variant="body2">
      <strong>{bedCount}</strong> bd
    </Typography>
    <Typography variant="overline">|</Typography>
    <Typography variant="body2">
      <strong>{bathCount}</strong> ba
    </Typography>
    <Typography variant="overline">|</Typography>
    <Typography variant="body2">
      <strong>{sqft}</strong> sqft
    </Typography>
  </Stack>
)
