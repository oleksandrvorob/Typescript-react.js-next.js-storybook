import { FunctionComponent } from 'react'
import Collapse from 'components/Collapse'
import CenteredStack from 'components/CenteredStack'

import StatRow from 'components/atoms/StatRow'
import StatY from 'components/atoms/StatY'
import Link from 'components/atoms/Link'

import { LoanContract } from 'lib/interfaces'

interface Props {
  loanId: number
  loanContract: LoanContract
}

const LoanContractCollapse: FunctionComponent<Props> = ({ loanId, loanContract }) => (
  <Collapse
    title="Loan Contract"
    linkComponent={<Link title={`${loanId}`} href={`/loan-contract/${loanId}`} />}
    contentComponent={
      <CenteredStack>
        <StatRow>
          <StatY label="borrower" value={loanContract.borrowerName} />
          <StatY label="amount" value={loanContract.amount} />
          <StatY label="address" value={loanContract.fullAddress} />
        </StatRow>
      </CenteredStack>
    }
  />
)

export default LoanContractCollapse
