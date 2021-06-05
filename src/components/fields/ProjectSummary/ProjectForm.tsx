import { Typography, TextField } from "@material-ui/core"
import React from "react"
import SelectField from "../SelectField"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"

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
    formContainer: {
      display: "flex",
      flexDirection: "column",
      maxWidth: 600,
    },
    commentField: {
      width: "90%",
      maxWidth: 500,
      marginBottom: theme.spacing(1)
    },
    inputTextField: {
      width: "90%",
      maxWidth: 500,
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(1)
    },
    bottomM: {
      marginBottom: theme.spacing(1)
    }, topM: {
      marginTop: theme.spacing(2)
    }
  }),
)


const ProjectForm = ({ register }) => {
  const classes = useStyles();
  return (
    <>
      <Typography className={`${classes.bottomM} ${classes.topM}`} variant="h6">
        Project Description
        </Typography>
      <TextField
        id="filled-multiline-static"
        className={classes.commentField}
        label="Project Description"
        multiline
        name="project_description"
        inputRef={register}
        rows={4}
        variant="filled"
        placeholder="-Full interior. All new Flooring, granite counter tops, New Lighting fixtures, Vanity Mirrors. Repair any damaged dry wall. Completely re-paint the interior"
      />

      <Typography className={`${classes.bottomM} ${classes.topM}`} variant="h6">
        Project Details
        </Typography>

      <SelectField register={register} id="currently_occupied" parentClass={classes.parentClass} className={classes.selectField} required menuItems={[{ label: "No", value: 1 }, { label: 'Yes', value: 2 }]} label="is the property currently occupied?" />


      <TextField
        className={classes.inputTextField}
        label="Anticipated construction time (in weeks)"
        type="number"
        name="anticipated"
        inputRef={register}
        variant="filled"
      />

      <SelectField id="projectManagerName" register={register} parentClass={classes.parentClass} className={classes.selectField} required menuItems={[{ label: "Mid-Range", value: 1 }, { label: 'test', value: '2' }]} label="What is the target quality of finishes for the project" />

      <SelectField id="projectManagerName" register={register} parentClass={classes.parentClass} className={classes.selectField} required menuItems={[{ label: "Yes", value: 1 }, { label: 'No', value: 2 }]} label="Will the project require permits?" />

      <TextField
        className={classes.inputTextField}
        label="How long will it take to obtain the permit (in days)?"
        type="number"
        variant="filled"
        name="permit"
        inputRef={register}
      />
    </>
  )
}
export default ProjectForm