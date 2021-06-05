import styled from 'styled-components'
import { Typography, Divider } from '@material-ui/core'

import Flex from '../Flex'

const Stack = styled(Flex)`
  > * + * {
    margin-left: 8px;
  }

  div {
    flex-basis: 30%;
  }

  font-size: 12px;
  width: 100%;
`

export default ({ paidToDate = '-', maturityDate = '-', paidOffDate = '-' }) => (
  <Stack>
    <Flex direction="column" align="center" style={{ flexShrink: 0 }}>
      <Typography variant="caption" color="textSecondary">
        paid to date
      </Typography>
      <Typography variant="overline" style={{ lineHeight: 1.2 }} color="textPrimary">
        {paidToDate}
      </Typography>
    </Flex>
    <Divider orientation="vertical" flexItem />
    <Flex direction="column" align="center" style={{ flexShrink: 0 }}>
      <Typography variant="caption" color="textSecondary">
        maturity date
      </Typography>
      <Typography variant="overline" style={{ lineHeight: 1.2 }} color="textPrimary">
        {maturityDate}
      </Typography>
    </Flex>
    <Divider orientation="vertical" flexItem />
    <Flex direction="column" align="center" style={{ flexShrink: 0 }}>
      <Typography variant="caption" color="textSecondary">
        paid off date
      </Typography>
      <Typography variant="overline" style={{ lineHeight: 1.2 }} color="textPrimary">
        {paidOffDate}
      </Typography>
    </Flex>
  </Stack>
)
