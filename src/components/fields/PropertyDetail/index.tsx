import { useState, useEffect } from "react"
import SelectField from "components/fields/SelectField"
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Typography, TextField, Button } from '@material-ui/core';
import { useForm } from "react-hook-form"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    parentClass: {
      width: "90%",
      maxWidth: 500,
      minWidth: 300,
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(4)
    },
    selectField: {
      width: "100%",
    },
    disabledField: {
      width: "90%",
      maxWidth: 500,
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(2)
    },
    formContainer: {
      display: "flex",
      flexDirection: "column",
      maxWidth: 600
    },
    formTitle: {
      marginBottom: theme.spacing(2),
      fontWeight: "bold"
    },
    formDescription: {
      marginBottom: theme.spacing(2),

    },

    saveBtn: {
      width: 175
    }
  }),
)


const PropertyDetail = () => {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const [address, setAddress] = useState("");

  const onSubmit = (data) => {
    console.log(data);
  }

  useEffect(() => {
    // fetch and set Address here
    setAddress("XYZ Street")
  }, [])


  return (
    <div className={classes.formContainer}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography className={classes.formTitle} variant="h4" >Property Details</Typography>

        <Typography className={classes.formDescription} variant="body1">
          Below are all of the details we have about your client’s deal. If you have to change these details you may do so below, please note that changes may affect your Loan-to-Value or your rate.
      </Typography>
        <Typography variant="body2">
          To revise the address on this loan application please reach out to your account manager. Daniel Shepherd at 415-658-6574 or daniel.shepherd@lendinghome.com
      </Typography>

        <TextField
          disabled
          id="filled-disabled"
          label="Address"
          value={address}
          variant="filled"
          className={classes.disabledField}
        />


        <SelectField register={register} id="propertyType" parentClass={classes.parentClass} className={classes.selectField} required menuItems={[{ label: "Single-Family Home", value: "Single-Family Home" }, { label: 'test', value: 'test' }]} label="Property Type" />

        <SelectField register={register} id="occupyProperty" parentClass={classes.parentClass} className={classes.selectField} required menuItems={[{ label: "No", value: "No" }, { label: 'Yes', value: "Yes" }]} label="Do you plain to occupy the property?" />

        <SelectField register={register} id="purchaseContract" parentClass={classes.parentClass} className={classes.selectField} required menuItems={[{ label: "No", value: "No" }, { label: 'Yes', value: "Yes" }]} label="Accepted Purchase Contract?" />

        <Button type="submit" className={classes.saveBtn} variant="contained" color="secondary">
          Save & Continue
        </Button>
      </form>
    </div>
  )
}

export default PropertyDetail;