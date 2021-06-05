import styled from 'styled-components'
import { Typography } from '@material-ui/core'

import BorderedBox from '../BorderedBox'

const Wrapper = styled(BorderedBox)`
  position: relative;
  padding: 16px;
`

const Label = styled.div`
  position: absolute;
  background: ${({ theme }) => theme?.palette?.background?.paper};

  border-radius: 4px;

  padding-top: 8px;
  padding-left: 16px;
  padding-right: 16px;

  top: -21px;
  left: 16px;
`

export default ({ label, children }) => (
  <Wrapper>
    <Label>
      <Typography variant="caption" color="textPrimary">
        {label}
      </Typography>
    </Label>
    {children}
  </Wrapper>
)
