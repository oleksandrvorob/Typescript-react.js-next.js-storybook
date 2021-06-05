import { FC } from 'react'
import { makeStyles, Theme } from "@material-ui/core/styles";
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

import _get from 'lodash/get'


const useStyles = makeStyles((theme: Theme) => ({
  root: props => ({
    borderLeftWidth: '2px',
    borderLeftColor: _get(props, 'active') ? theme.palette.action.active : 'transparent',
    borderLeftStyle: 'solid'
  }),
  icon: props => ({ color: theme.palette.success.main }),
  typography: { cursor: 'pointer' }
}));

const TaskLink: FC<{
  label: String
  active?: boolean
  completed?: boolean
  onClick?: () => void
}> = ({ active = false, completed = false, label, onClick }) => {
  const classes = useStyles({ active });

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" padding="16px" paddingLeft="24px" className={classes.root} >
      <Typography className={classes.typography} onClick={() => onClick()}>{label}</Typography>
      {completed && <CheckCircleOutlineIcon className={classes.icon} fontSize="small" />}
    </Box>
  )
}

export default TaskLink