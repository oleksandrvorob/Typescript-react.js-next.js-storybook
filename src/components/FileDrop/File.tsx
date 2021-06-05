import React, { ReactElement, MouseEvent } from 'react'
import styled from 'styled-components'

import { Card, CircularProgress, SvgIcon, Typography, IconButton } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { green } from '@material-ui/core/colors'
import CloseIcon from '@material-ui/icons/Close'

import ExcelIcon from './file-excel-outline.svg'

import { makeStyles, Theme } from '@material-ui/core/styles'

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 8px;

  > * + * {
    margin-top: 8px;
  }
`

const InnerStack = styled(Stack)`
  padding: 0px 16px 16px 16px;
`

interface Props {
  fileName: string
  status: number
  errorMessage: string
  onRemove(_e: MouseEvent<any>): void
}

const useStyles = makeStyles((_theme: Theme) => ({
  root: { background: 'transparent', width: 'fit-content' },
  closeIcon: { alignSelf: 'flex-end' },
  excelIcon: { color: green['400'], fontSize: 48 },
}))

const Top = ({ status, errorMessage, onRemove }) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    }}
  >
    <Alert
      severity={status === 1 ? 'success' : status === 0 ? 'error' : 'warning'}
      style={{ background: 'transparent' }}
    >
      {status === 1 ? 'Ready' : status === 0 ? errorMessage : 'Verifying...'}
    </Alert>
    <IconButton
      onClick={onRemove}
      size="small"
      disabled={status === 'checking'}
      style={{ height: '30px', width: '30px' }}
    >
      {status < 0 ? <CircularProgress size={24} /> : <CloseIcon color="action" />}
    </IconButton>
  </div>
)

function File({ fileName, status, errorMessage, onRemove }: Props): ReactElement {
  const classes = useStyles()
  return (
    <Card variant="outlined" className={classes.root}>
      <Stack>
        <Top status={status} errorMessage={errorMessage} onRemove={onRemove} />
        <InnerStack>
          <SvgIcon className={classes.excelIcon}>
            <ExcelIcon />
          </SvgIcon>
          <Typography color="textSecondary">{fileName}</Typography>
        </InnerStack>
      </Stack>
    </Card>
  )
}

export default File
