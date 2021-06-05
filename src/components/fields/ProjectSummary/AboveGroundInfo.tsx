import { Typography, Grid, TextField } from "@material-ui/core"
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import SelectField from "../SelectField";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    parentClass: {
      width: "90%",
      maxWidth: 500,
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(2)
    },
    selectField: {
      width: "100%",
      maxWidth: 500
    },
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
const AboveGroundInfo = ({ register }) => {
  const classes = useStyles()

  return (
    <>
      <Typography className={`${classes.bottomM} ${classes.topM}`} variant="h6">
        Above Ground Information
         </Typography>

      <Grid className={classes.bottomM} container alignItems="center" justify="space-between">
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
            <TextField label="Current sq ft" variant="standard" type="number" name="above_currentSqFt" inputRef={register} />
          </Grid>
          <Grid item xs={4}>
            <TextField label="Rehab sq ft" variant="standard" type="number" name="above_rehabSqFt" inputRef={register} />
          </Grid>
        </Grid>

        <Grid className={classes.tableRow} container>
          <Grid item xs={3}>
            <Typography className={classes.boldText}>
              Property <br /> Type
          </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>
              Single-Family Home
          </Typography>
          </Grid>
          <Grid item xs={4}>
            <SelectField register={register} id="property_type" parentClass={classes.parentClass} className={classes.selectField} required menuItems={[{ label: "Single-Family Home", value: 1 }, { label: 'test', value: 'test' }]} label="Property Type" />
          </Grid>
        </Grid>

        <Grid className={classes.tableRow} container>
          <Grid item xs={3}>
            <Typography className={classes.boldText}># of <br /> Bedrooms</Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField label="Current bedrooms" variant="standard" type="number" name="above_current_bedrooms" inputRef={register} />
          </Grid>
          <Grid item xs={4}>
            <TextField label="Rehab bedrooms" variant="standard" type="number" name="above_rehab_bedrooms" inputRef={register} />
          </Grid>
        </Grid>

        <Grid className={`${classes.tableRow} ${classes.bottomM}`} container>
          <Grid item xs={3}>
            <Typography className={classes.boldText}># of <br /> Bathrooms</Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField label="Current bathrooms" variant="standard" type="number" name="above_current_bathrooms" inputRef={register} />
          </Grid>
          <Grid item xs={4}>
            <TextField label="Rehab bathrooms" variant="standard" type="number" name="above_rehab_bathrooms" inputRef={register} />
          </Grid>
        </Grid>
      </Grid >
    </>
  )
}
export default AboveGroundInfo