import styled from 'styled-components'
import Flex from '../Flex'

const Wrapper = styled(Flex)`
  color: ${({ theme }) => theme?.palette.text.primary};
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme?.palette.action.disabledBackground};

  flex-direction: column;
  align-items: stretch;
`

const Hero = styled.div`
  background: ${({ theme }) => theme?.palette.background.default};
  color: ${({ theme }) => theme?.palette.text.secondary};
  font-size: 1.2rem;
  padding: 4px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  overflow-wrap: break-word;
`
const Content = styled.div`
  padding: 4px;
  background: ${({ theme }) => theme?.palette.background.paper};
  color: ${({ theme }) => theme?.palette.text.primary};
  vertical-align: baseline;

  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  overflow-wrap: break-word;
`

export default ({ label, value }) => (
  <Wrapper>
    <Hero>
      <strong>{label}</strong>
    </Hero>
    <Content>{value}</Content>
  </Wrapper>
)
