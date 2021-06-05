import { FunctionComponent } from 'react'
import Fab, { FabProps } from '@material-ui/core/Fab'

import { makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
  root: (props: FabProps) => ({
    border: `1px solid ${
      props.disabled ? theme.palette.action.disabled : theme.palette.primary.main
    }`,
    boxShadow: 'none',
    background: 'transparent',
    flexShrink: 0,
  }),
}))

const OutlinedFab: FunctionComponent<FabProps> = (props) => {
  const classes = useStyles(props)

  return <Fab className={classes.root} {...props} variant="round" />
}

export default OutlinedFab
