import { makeStyles, Theme, darken } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import { getTimeStamp } from 'lib/utils'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    borderRadius: 5,
    width: 'fit-content',
    background: darken(theme.palette.background.paper, 0.02),
    padding: theme.spacing(0.15),
  },
}))

const Date = ({ value }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Typography variant="caption" color="textSecondary">
        {getTimeStamp(value, '.')}
      </Typography>
    </div>
  )
}

export default Date
