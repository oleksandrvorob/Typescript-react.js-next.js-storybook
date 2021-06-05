import { useState } from 'react'
import { useRouter } from 'next/router'

import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles'

import Badge from '@material-ui/core/Badge'
import Collapse from '@material-ui/core/Collapse'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import AccountBalanceIcon from '@material-ui/icons/AccountBalance'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import AssignmentIcon from '@material-ui/icons/Assignment'
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd'
import HomeIcon from '@material-ui/icons/Home'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'

// Draw request icon
import FormatPaintIcon from '@material-ui/icons/FormatPaint'

import BankTransferOut from 'components/icons/BankTransferOut'
import BankTransfer from 'components/icons/BankTransfer'

import { useAppContext } from 'lib/appContext'

import { drawerWidth } from './constants'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }),
)

export default function PersistentDrawerLeft({ open, setOpen }) {
  const { drawerStats } = useAppContext()

  const classes = useStyles()
  const theme = useTheme()
  const router = useRouter()
  const [accountingOpen, setAccountingOpen] = useState(false)

  const { fundDrawsCount, drawReimbursementsCount } = drawerStats
  const accountingTotal = (fundDrawsCount || 0) + (drawReimbursementsCount || 0)

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={() => setOpen(false)}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>
      <Divider />
      <List>
        <ListItem button onClick={() => router.push('/')}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button onClick={() => router.push('/loan-contracts')}>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Loan Contracts" />
        </ListItem>
        <ListItem button onClick={() => router.push('/fci')}>
          <ListItemIcon>
            <AssignmentIndIcon />
          </ListItemIcon>
          <ListItemText primary="Servicing" />
        </ListItem>
        <ListItem button onClick={() => router.push('/draw-requests')}>
          <ListItemIcon>
            <FormatPaintIcon />
          </ListItemIcon>
          <ListItemText primary="Draw Requests" />
        </ListItem>

        {/* Accounting */}
        <ListItem button onClick={() => setAccountingOpen(!accountingOpen)}>
          <ListItemIcon>
            <Badge badgeContent={accountingTotal} color="primary">
              <AccountBalanceIcon />
            </Badge>
          </ListItemIcon>
          <ListItemText primary="Accounting" />
          {accountingOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={accountingOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              button
              className={classes.nested}
              onClick={() => router.push('/accounting/fund-draws')}
            >
              <ListItemIcon>
                <Badge badgeContent={fundDrawsCount} color="primary">
                  <BankTransferOut />
                </Badge>
              </ListItemIcon>
              <ListItemText primary="Fund Draws" />
            </ListItem>
            <ListItem
              button
              className={classes.nested}
              onClick={() => router.push('/accounting/draw-reimbursements')}
            >
              <ListItemIcon>
                <Badge badgeContent={drawReimbursementsCount} color="primary">
                  <BankTransfer />
                </Badge>
              </ListItemIcon>
              <ListItemText primary="Draw Reimbursements" />
            </ListItem>
          </List>
        </Collapse>
      </List>
    </Drawer>
  )
}
