import { useState, useCallback } from "react"
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
    commentField: {
      width: "90%",
      maxWidth: 500,
      marginBottom: theme.spacing(4)
    },
    inputTextField: {
      width: "90%",
      maxWidth: 500,
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(1)
    },
    saveBtn: {
      width: 175
    }
  }),
)


const RehabForm = () => {
  const classes = useStyles();
  const [formFields, setFormFields] = useState({
    projectManagerName: 1,
  });
  const handleChange = useCallback(
    ({ target: { name: fieldName, value: fieldValue } }) => {

      setFormFields({
        ...formFields,
        [fieldName]: fieldValue
      })
    },
    [formFields],
  )
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  }

  return (
    <div className={classes.formContainer}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography className={classes.formTitle} variant="h4" >Project Management</Typography>
        <Typography className={classes.formDescription} variant="body1">
          Please provide information about who is managing the project. Note that a general contractor is required if you are doing foundation work, adding square footage, modifying the structure, or if there is any natural/major damage (fire, etc.)
      </Typography>
        <Typography variant="h6" >
          Who Will Be Managing the Project?
      </Typography>
        <SelectField register={register} id="projectManagerName" parentClass={classes.parentClass} className={classes.selectField} required menuItems={[{ label: "Myself (Doing Some Work and Hiring Subcontractors )", value: 1 }, { label: 'test', value: 'test' }]} label="Project Manager Name" onChange={handleChange} />
        <Typography variant="subtitle1" >Additional Comments</Typography>
        <TextField
          inputRef={register}
          name="AdditionalCmnt"
          id="filled-multiline-static"
          className={classes.commentField}
          label="Multiline"
          multiline
          rows={4}
          variant="filled"
        />
        <Typography variant="h6" component="h2">General Contractor</Typography>
        <TextField inputRef={register} className={classes.inputTextField} label="General Contractor Name" variant="filled" placeholder="N/A" />
        <TextField
          inputRef={register}
          name="phoneNo"
          className={classes.inputTextField}
          label="Phone Number"
          type="number"
          variant="filled"
        />
        <TextField inputRef={register} name="stateOrCity" className={classes.inputTextField} label="License State or City" variant="filled" />
        <TextField inputRef={register} name="licenseNo" className={classes.inputTextField} label="License Number" variant="filled" />
        <Button type="submit" className={classes.saveBtn} variant="contained" color="secondary">
          Save & Continue
      </Button>
      </form>
    </div>
  )
}

export default RehabForm;