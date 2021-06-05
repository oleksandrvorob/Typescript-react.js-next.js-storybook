import styled from 'styled-components'
import Preview from '../LoanContract/Preview'
import LabeledBox from '../LabeledBox'

import Flex from '../Flex'

const Wrapper = styled.div`
  padding: 32px;
`

export default (row) => (
  <Wrapper>
    <Flex>
      <LabeledBox label="Loan Contract">
        <Preview {...(row?.nestedLoanContract ?? {})} />
      </LabeledBox>
    </Flex>
  </Wrapper>
)
