import styled from 'styled-components'
import Flex from './Flex'

export default styled(Flex)`
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme?.palette?.divider};
  background: ${({ theme }) => theme?.palette?.background?.paper};
`
