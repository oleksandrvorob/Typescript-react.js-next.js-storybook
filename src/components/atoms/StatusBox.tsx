import { FunctionComponent } from 'react'
import Box from '@material-ui/core/Box'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  info: {
    backgroundColor: '#f5fafe',
    borderColor: '#b3e5fc',
  },
}))

const StatusBox: FunctionComponent = ({ children }) => {
  const classes = useStyles()

  return (
    <Box
      borderRadius={4}
      border={1}
      paddingX={0.5}
      marginLeft="auto"
      display="flex"
      alignItems="center"
      className={classes.info}
    >
      {children}
    </Box>
  )
}

export default StatusBox
