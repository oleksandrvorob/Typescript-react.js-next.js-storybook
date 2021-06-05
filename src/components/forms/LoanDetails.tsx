import { makeStyles, Theme } from "@material-ui/core/styles";
import Box from '@material-ui/core/Box'

import CurrencyField from 'components/fields/Currency'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2)
    }
  }
}));

const LoanDetailsForm = () => {
  const classes = useStyles();

  return (
    <Box display="flex" flexDirection="column" className={classes.root} maxWidth="450px">
      <CurrencyField label="Purchase Price" variant="outlined" />
      <CurrencyField label="As-Is Property Value" variant="outlined" />
      <CurrencyField label="Rehab Amount Requested" variant="outlined" />
      <CurrencyField label="After Repair Property Value" variant="outlined" />
      <CurrencyField label="Seller Concessions" variant="outlined" />
      <CurrencyField label="Assignment Fees" variant="outlined" />
    </Box>
  )
}

export default LoanDetailsForm