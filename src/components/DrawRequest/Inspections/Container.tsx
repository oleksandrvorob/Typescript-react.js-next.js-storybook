import { Children, FunctionComponent } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'

import Empty from 'components/atoms/Empty'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  inspections: {
    '& > * + *': {
      marginTop: theme.spacing(1),
    },
    width: '100%',
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing(15),
      marginRight: theme.spacing(15),
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
}))

const InspectionContainer: FunctionComponent = ({ children }) => {
  const classes = useStyles()

  return (
    <>
      {Children.count(children) ? (
        <div className={classes.root}>
          <div className={classes.inspections}>{children}</div>
        </div>
      ) : (
        <div className={classes.root}>
          <Empty message="No active inspections belong to this draw request." />
        </div>
      )}
    </>
  )
}

export default InspectionContainer
