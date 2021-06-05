import { FunctionComponent } from 'react'

import IconButton from '@material-ui/core/IconButton'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'

import { makeStyles, Theme } from '@material-ui/core/styles'

type Severity = 'success' | 'info' | 'warning' | 'error'

interface Props {
  severity: Severity
}

function getColor(severity: Severity, theme: Theme) {
  switch (severity) {
    case 'error':
      return theme.palette.error.main
    case 'warning':
      return theme.palette.warning.main
    case 'success':
      return theme.palette.success.main
    default:
      return theme.palette.info.main
  }
}

const useStyles = makeStyles((theme: Theme) => ({
  icon: ({ severity }: Props) => ({
    color: getColor(severity, theme),
  }),
}))

const AlertIcon: FunctionComponent<Props> = ({ severity }) => {
  const classes = useStyles({ severity })

  return (
    <IconButton disabled style={{ verticalAlign: 'middle' }}>
      {severity === 'success' ? (
        <CheckCircleOutlineIcon className={classes.icon} />
      ) : (
        <ErrorOutlineIcon className={classes.icon} />
      )}
    </IconButton>
  )
}

export default AlertIcon
