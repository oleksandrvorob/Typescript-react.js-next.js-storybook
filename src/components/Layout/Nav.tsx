import React from 'react'
import clsx from 'clsx'
import { signOut, useSession } from 'next-auth/client'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Avatar from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'

import MenuIcon from '@material-ui/icons/Menu'

import { drawerWidth } from './constants'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      color: 'white',
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    hide: {
      display: 'none',
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
      color: 'primary',
    },
    root: {
      flexGrow: 1,
    },
    stack: {
      display: 'flex',
      alignItems: 'center',
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
    },
    smallStack: {
      '& > * + *': {
        marginLeft: theme.spacing(1),
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      color: 'white',
    },
    title: {
      flexGrow: 1,
    },
  }),
)

export default function Nav({ drawerOpen, handleOpenDrawer }) {
  const [session] = useSession()

  const user = session?.user

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar
        position="sticky"
        elevation={0}
        className={clsx(classes.appBar, {
          [classes.appBarShift]: drawerOpen,
        })}
      >
        <Toolbar>
          <IconButton
            edge="start"
            className={clsx(classes.menuButton, drawerOpen && classes.hide)}
            aria-label="menu"
            onClick={handleOpenDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Quanta
          </Typography>

          {user?.email && (
            <div className={classes.stack}>
              <Box className={classes.smallStack} display="flex" alignItems="center">
                <Avatar alt={user?.name} src={user?.image} />
                <Typography>{user.email}</Typography>
              </Box>
              <Button
                color="inherit"
                href="/api/logout"
                variant="outlined"
                onClick={async (e) => {
                  e.preventDefault()
                  // @ts-ignore
                  signOut()
                }}
              >
                Logout
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}
