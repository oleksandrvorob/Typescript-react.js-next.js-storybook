import styled from 'styled-components'
import { Chip, Divider, Typography } from '@material-ui/core'
import NoLinkIcon from '@material-ui/icons/RemoveCircleOutline'

import Flex from '../Flex'
import StatX from '../atoms/StatX'
import StatY from '../atoms/StatY'
import StatRow from '../atoms/StatRow'
import StatLink from '../atoms/StatLink'

const StackX = styled(Flex)`
  align-items: center;
  justify-content: center;

  > * + * {
    margin-left: 8px;
  }
`

const Stack = styled(Flex)`
  flex-direction: column;
  align-items: center;
  > * + * {
    margin-top: 8px;
  }
`
export default ({ loanContract }) => (
  <Stack>
    {/* title info */}
    <Flex direction="column">
      <StatX value={loanContract?.fullAddress} />
      <StatX label="borrower" value={loanContract?.borrowerName} />
    </Flex>
    {/* midsection */}
    <StackX>
      {loanContract?.fciLoanId ? (
        <StatLink label="linked fci" value={`/fci/${loanContract?.fciLoanId}`} />
      ) : (
        <Flex align="center">
          <NoLinkIcon color="action" />
          <Typography variant="subtitle2" color="textSecondary">
            no fci
          </Typography>
        </Flex>
      )}

      <Chip
        variant="outlined"
        size="small"
        label={loanContract?.status ? loanContract.status : 'no status'}
      />
    </StackX>
    {/* stat row */}
    <StatRow>
      <StatY label="funded" value={loanContract?.fundingDate} />
      <Divider orientation="vertical" flexItem />
      <StatY label="amount" value={loanContract?.amount} />
      <Divider orientation="vertical" flexItem />
      <StatY label="position" value={loanContract?.lienPosition} />
    </StatRow>
  </Stack>
)
