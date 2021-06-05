import { Typography, Grid, TextField } from "@material-ui/core"
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    centerText: {
      textAlign: "center"
    },
    boldText: {
      fontWeight: "bold"
    },
    headText: {
      borderBottom: "1px solid rgba(128, 128, 128)",
      paddingBottom: 10,
      paddingTop: 10,
      marginBottom: theme.spacing(2)
    },
    tableRow: {
      height: 85,
      justifyContent: "space-between",
      alignItems: "center"
    }, bottomM: {
      marginBottom: theme.spacing(1)
    }, topM: {
      marginTop: theme.spacing(2)
    }
  }),
)
const BelowGroundInfo = ({ register }) => {
  const classes = useStyles()
  return (
    <>
      <Typography className={`${classes.bottomM} ${classes.topM}`} variant="h6">
        Below Ground Information
      </Typography>

      <Grid container alignItems="center" justify="space-between">
        <Grid className={`${classes.centerText} ${classes.headText}`} item xs={8}>
          <Typography className={classes.boldText}>Current</Typography>
        </Grid>
        <Grid className={classes.headText} item xs={4}>
          <Typography className={classes.boldText}>Rehabbed</Typography>
        </Grid>

        <Grid className={classes.tableRow} container>
          <Grid item xs={3}>
            <Typography className={classes.boldText}>Est. Sq. Ft.</Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField label="Current sq ft" variant="standard" type="number" name="below_currentSqFt" inputRef={register} />
          </Grid>
          <Grid item xs={4}>
            <TextField label="Rehab sq ft" variant="standard" type="number" name="below_rehabSqFt" inputRef={register} />
          </Grid>
        </Grid>

        <Grid className={classes.tableRow} container>
          <Grid item xs={3}>
            <Typography className={classes.boldText}>
              # of Living <br /> Rooms
          </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField label="Current Living Rooms" variant="standard" type="number" name="below_current_livingrooms" inputRef={register} />
          </Grid>
          <Grid item xs={4}>
            <TextField label="Rehabbed Living Rooms" variant="standard" type="number" name="below_rehab_livingrooms" inputRef={register} />
          </Grid>
        </Grid>

        <Grid className={classes.tableRow} container>
          <Grid item xs={3}>
            <Typography className={classes.boldText}># of <br /> Bedrooms</Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField label="Current # of Bedrooms" variant="standard" type="number" name="below_curent_bedrooms" inputRef={register} />
          </Grid>
          <Grid item xs={4}>
            <TextField label="Rehab # of Bedrooms" variant="standard" type="number" name="below_rehab_bedrooms" inputRef={register} />
          </Grid>
        </Grid>

        <Grid className={classes.tableRow} container>
          <Grid item xs={3}>
            <Typography className={classes.boldText}># of <br /> Bathrooms</Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField label="Current # of Bathdrooms" variant="standard" type="number" name="below_curent_bathrooms" inputRef={register} />
          </Grid>
          <Grid item xs={4}>
            <TextField label="Rehab # of Bathrooms" variant="standard" type="number" name="below_curent_bathrooms" inputRef={register} />
          </Grid>
        </Grid>

      </Grid>

    </>
  )
}

export default BelowGroundInfo