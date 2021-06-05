import { useState } from 'react'
import clsx from 'clsx'

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { Container } from '@material-ui/core'

import Nav from './Nav'
import GlobalMessage from './Global-Message'
import Drawer from './Drawer'

import { drawerWidth } from './constants'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: drawerWidth,
    },
    container: {
      maxWidth: '90%',
    },
  }),
)

export default ({ children }) => {
  const [open, setOpen] = useState(false)
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Nav drawerOpen={open} handleOpenDrawer={() => setOpen(true)} />
      <Drawer open={open} setOpen={setOpen} />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <Container className={classes.container}>{children}</Container>
      </main>
      <GlobalMessage />
    </div>
  )
}
