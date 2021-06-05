import styled from 'styled-components'

import Flex from 'components/Flex'

const CenteredStack = styled(Flex)`
  align-items: center;
  flex-direction: column;
  width: 100%;

  > * + * {
    margin-top: 16px;
  }
`

export default CenteredStack
