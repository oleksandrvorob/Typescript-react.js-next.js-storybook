import styled from 'styled-components'

type Direction = 'row' | 'column'
type JustifyProps =
  | 'center'
  | 'flex-start'
  | 'flex-end'
  | 'stretch'
  | 'space-around'
  | 'space-between'
  | 'space-evenly'
type AlignProps = 'baseline' | JustifyProps

interface FlexProps {
  direction?: Direction
  justify?: JustifyProps
  align?: AlignProps
}

const Flex = styled.div<FlexProps>`
  display: flex;
  flex-direction: ${(props) => (props.direction ? props.direction : 'row')};
  justify-content: ${(props) => (props.justify ? props.justify : 'flex-start')};
  align-items: ${(props) => (props.align ? props.align : 'flex-start')};
`

export default Flex
