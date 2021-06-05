import { FunctionComponent } from 'react'
import InboxIcon from '@material-ui/icons/Inbox'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'

import { makeStyles, Theme } from '@material-ui/core/styles'

interface Props {
  message: string
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    '& > *+*': {
      marginLeft: theme.spacing(1),
    },
  },
  text: {
    marginLeft: theme.spacing(3),
  },
}))

const Empty: FunctionComponent<Props> = ({ message }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <InboxIcon color="disabled" />
        <Divider orientation="vertical" flexItem />
        <Typography variant="caption" color="textSecondary" className={classes.text}>
          {message}
        </Typography>
      </div>
    </div>
  )
}

export default Empty
