import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Radio, RadioGroup, FormControlLabel } from '@material-ui/core';
import { Controller } from "react-hook-form";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bottomM: {
      marginBottom: theme.spacing(1)
    }
  }))

const RadioInput = ({ control, name }) => {
  const classes = useStyles();

  return (
    <Controller
      control={control}
      defaultValue="No"
      name={name}
      as={
        <RadioGroup className={classes.bottomM} aria-label="quiz">
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio />} label="No" />
        </RadioGroup>
      }
    />
  )
}
export default RadioInput