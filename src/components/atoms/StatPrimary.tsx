import { FunctionComponent, MouseEvent, useState } from 'react'
import clsx from 'clsx'

import { makeStyles, Theme } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Popover from '@material-ui/core/Popover'
import Typography, { TypographyProps } from '@material-ui/core/Typography'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'

type StatType = 'money' | 'date'

interface Props extends TypographyProps {
  label: string
  value: string
  type?: StatType
  popoverMessage?: string
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    width: 'fit-content',
  },
  row: {
    '& > * + *': {
      marginLeft: theme.spacing(0.2),
    },
  },
  placeHolder: {
    color: theme.palette.action.disabled,
  },
}))

const usePopoverStyles = makeStyles((theme: Theme) => ({
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(4),
  },
  icon: {
    color: theme.palette.primary.dark,
  },
}))

const getPlaceholder = (type: StatType) => {
  switch (type) {
    case 'money':
      return '$ -'
    case 'date':
      return '-/-/-'
    default:
      return '-'
  }
}

const PopoverMessage = ({ message }) => {
  const classes = usePopoverStyles()
  // anchor for text popover
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const handlePopoverOpen = (event: MouseEvent<HTMLElement, MouseEvent>) => {
    console.log('HIII')
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  return (
    <div
      aria-owns={open ? 'mouse-over-popover' : undefined}
      aria-haspopup="true"
      // @ts-ignore
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}
    >
      <InfoOutlinedIcon fontSize="small" className={classes.icon} />
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        elevation={5}
        classes={{
          paper: classes.paper,
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography>{message}</Typography>
      </Popover>
    </div>
  )
}

const StatPrimary: FunctionComponent<Props> = ({
  label,
  value,
  type = 'money',
  color = 'textSecondary',
  popoverMessage,
  ...typographyProps
}) => {
  const classes = useStyles()
  const placeholder = getPlaceholder(type)
  const hasValue = Boolean(value && value != '-')

  const display = hasValue ? value : placeholder
  const displayColor = hasValue ? color : 'inherit'

  return (
    <div className={classes.root}>
      <Typography
        {...typographyProps}
        color={displayColor}
        className={clsx(!hasValue && classes.placeHolder)}
      >
        {display}
      </Typography>
      <Box display="flex" className={classes.row}>
        <Typography variant="subtitle2" color="primary" className={classes.label} noWrap>
          {label}
        </Typography>
        {!!popoverMessage ? <PopoverMessage message={popoverMessage} /> : null}
      </Box>
    </div>
  )
}

export default StatPrimary
