import styled from 'styled-components'
import _isEmpty from 'lodash/isEmpty'

import { Typography } from '@material-ui/core'
import LinkOffIcon from '@material-ui/icons/LinkOff'
import LinkIcon from '@material-ui/icons/Link'
import IconButton from '@material-ui/core/IconButton'

import Flex from '../Flex'
import BorderedBox from '../BorderedBox'

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  text-align: center;
  margin-left: 1.618em;
  padding-top: 1.618em;
  padding-bottom: 1.618em;
`

const Group = styled(BorderedBox)`
  position: relative;
`

const BorderedDiv = styled.div`
  padding: 0.618em;
`

const BorderedFlex = styled(Flex)`
  padding: 0.618em;
`

const Label = styled.div`
  border-radius: 10px;
  box-sizing: border-box;
  position: absolute;
  background: white;
  padding-left: 1em;
  padding-right: 1em;
  top: -20px;
  left: 15px;
`

const LabelContent = ({ title, empty = false }) => (
  <Flex justify="center" align="center">
    <IconButton>
      {empty ? (
        <LinkIcon color="primary" />
      ) : (
        <LinkOffIcon style={{ color: 'rgba(179, 179, 179)' }} />
      )}
    </IconButton>
    <Typography variant="overline" style={{ color: 'rgba(179, 179, 179)', marginTop: '0.146em' }}>
      {title}
    </Typography>
  </Flex>
)

export default ({
  title,
  data,
  component,
  // defaultIcon = { LinkOffIcon },
  // emptyIcon = { LinkIcon },
}) => {
  const empty = _isEmpty(data)

  return (
    <Wrapper>
      <Group>
        {empty ? (
          <BorderedFlex justify="center" align="center">
            <LabelContent title={title} empty />
          </BorderedFlex>
        ) : (
          <BorderedDiv>
            <Label>
              <LabelContent title={title} />
            </Label>
            {component(data)}
          </BorderedDiv>
        )}
      </Group>
    </Wrapper>
  )
}
