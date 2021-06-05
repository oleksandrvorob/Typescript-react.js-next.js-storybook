import { makeStyles, Theme } from "@material-ui/core/styles";
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'

import CurrencyField from 'components/fields/Currency'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2)
    }
  },
  horizontal: {
    '& > * + *': {
      marginLeft: theme.spacing(2)
    }
  },
  fullWidth: {
    width: '100%'
  }
}));

const LoanDetailsForm = () => {
  const classes = useStyles();

  return (
    <Box display="flex" flexDirection="column" className={classes.root} maxWidth="450px">
      <Box display="flex" alignItems="center" className={classes.horizontal} width="100%">
        <TextField label="First Name" variant="outlined" className={classes.fullWidth} />
        <TextField label="Last Name" variant="outlined" className={classes.fullWidth} />
      </Box>
      <TextField label="Email" variant="outlined" className={classes.fullWidth} />
      <Box display="flex" alignItems="center" className={classes.horizontal} width="100%">
        <TextField label="Phone Number" variant="outlined" className={classes.fullWidth} />
        <TextField label="Alternate Phone" variant="outlined" className={classes.fullWidth} />
      </Box>
    </Box>
  )
}

export default LoanDetailsForm