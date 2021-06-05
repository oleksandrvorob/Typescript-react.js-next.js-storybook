import { FunctionComponent } from 'react'
import styled from 'styled-components'
import isValid from 'date-fns/isValid'
import parseISO from 'date-fns/parseISO'
import format from 'date-fns/format'

import Typography, { TypographyProps } from '@material-ui/core/Typography'

interface DateProps extends TypographyProps {
  date: string
}

const Wrapper = styled.div`
  background: ${({ theme }) => theme?.palette.divider};
  color: ${({ theme }) => theme?.palette.text.primary};
  width: fit-content;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme?.palette.action.disabledBackground};
  padding-left: 0.618em;
  padding-right: 0.618em;
`

const Date: FunctionComponent<DateProps> = ({ date, ...props }) => {
  const _valid = isValid(parseISO(date))
  return (
    <>
      {_valid ? (
        <Wrapper>
          <Typography variant="caption" {...props}>
            {format(parseISO(date), 'MM/dd/yyyy')}
          </Typography>
        </Wrapper>
      ) : null}
    </>
  )
}

export default Date
