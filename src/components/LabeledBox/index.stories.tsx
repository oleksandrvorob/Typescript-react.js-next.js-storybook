import styled from 'styled-components'
import Box from '.'

const Wrapper = styled.div`
  padding: 5%;
`

export default { title: 'Labeled Box' }

export const Example = () => (
  <Wrapper>
    <Box label="some label">someting</Box>
  </Wrapper>
)
