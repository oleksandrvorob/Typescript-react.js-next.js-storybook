import styled from 'styled-components'

interface Props {
  space?: string
  direction?: string
}

const Stack = styled.div<Props>`
  display: flex;
  flex-direction: ${(props) => (props?.direction ? props.direction : 'column')};

  > * + * {
    margin-${(props) => (props?.direction === 'row' ? 'left' : 'top')}: ${(props) =>
  props?.space ? props.space : '1.618em'};
  }
`

export default Stack
