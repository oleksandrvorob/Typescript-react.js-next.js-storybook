import styled from 'styled-components'

const Stack = styled.div`
  display: flex;
  flex-direction: column;

  > * + * {
    margin-top: 2.618em;
  }
`

export default Stack
