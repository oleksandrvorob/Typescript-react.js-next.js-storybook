import styled from 'styled-components'
import { Typography, Link } from '@material-ui/core'
import LaunchIcon from '@material-ui/icons/Launch'

import Flex from 'components/Flex'
import LoanSpecs from 'components/LoanSpecs'

const Stack = styled(Flex)`
  padding: 8px;
  width: 100%;
  > * + * {
    margin-top: 16px;
  }
`

const FlexWrap = styled(Flex)`
  flex-wrap: wrap;
  flex-flow: row wrap;
  width: 100%;
`

const StackX = styled(Flex)`
  > * + * {
    margin-left: 8px;
  }
`

const Item = styled.div``

export default ({ id, knackId, maturityDate, amount, status, paidToDate, paidOffDate }) => (
  <Stack direction="column" align="center">
    <FlexWrap justify="space-evenly">
      <Item>
        <Typography>
          <Link href={`/loan-contract/${id}?section=overview`}>Overview</Link>
        </Typography>
      </Item>

      <Item>
        <Typography>
          <Link href={`https://quanta.knack.com/q-ops#/loan-edit-master/${knackId}/`}>
            <LaunchIcon
              style={{ height: '16px', width: '16px', verticalAlign: 'sub', marginBottom: '2px' }}
            />
            Knack
          </Link>
        </Typography>
      </Item>
      <Item>
        <Typography>
          <Link href={`/loan-contract/${id}?section=property`}>Property</Link>
        </Typography>
      </Item>
    </FlexWrap>
    <StackX justify="center" style={{ width: '100%' }} align="baseline">
      <Flex align="center">
        <Typography color="textSecondary" variant="caption" style={{ marginTop: '1px' }}>
          status:&nbsp;
        </Typography>
        <Typography variant="body2" color="textPrimary">
          {status}
        </Typography>
      </Flex>
      <Flex align="center">
        <Typography color="textSecondary" variant="caption" style={{ marginTop: '1px' }}>
          amount:&nbsp;
        </Typography>
        <Typography variant="body2" color="textPrimary">
          {amount}
        </Typography>
      </Flex>
    </StackX>
    <LoanSpecs paidToDate={paidToDate} maturityDate={maturityDate} paidOffDate={paidOffDate} />
  </Stack>
)
