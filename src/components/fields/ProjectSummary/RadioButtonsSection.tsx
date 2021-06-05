import { Box, Typography } from "@material-ui/core"
import RadioInput from "./RadioInput"
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import radioList from "./RadioList"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    topM: {
      marginTop: theme.spacing(2)
    }
  }))

const RadioButtonsSection = ({ control }) => {
  const classes = useStyles()
  return radioList.map(({ label, id }, key) => (
    <Box key={key}>
      <Typography className={classes.topM} variant="subtitle1">
        {label}
      </Typography>
      <RadioInput name={id} control={control} />
    </Box>
  ))
}
export default RadioButtonsSection