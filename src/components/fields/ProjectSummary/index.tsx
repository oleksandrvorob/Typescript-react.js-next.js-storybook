import React, { useState, useCallback } from "react"
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Button, } from '@material-ui/core';
import HeadSection from "./HeadSection"
import { useForm } from "react-hook-form"
import BelowGroundInfo from "./BelowGroundInfo";
import AboveGroundInfo from "./AboveGroundInfo";
import RadioButtonsSection from "./RadioButtonsSection";
import ProjectForm from "./ProjectForm";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({

    formContainer: {
      display: "flex",
      flexDirection: "column",
      maxWidth: 600,
    },
    saveBtn: {
      width: 175,
      marginTop: theme.spacing(5)
    }
  }),
)


const ProjectSummary = () => {
  const classes = useStyles();
  const { register, handleSubmit, control } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  }


  return (
    <div className={classes.formContainer}>
      <HeadSection />

      <form onSubmit={handleSubmit(onSubmit)}>

        <ProjectForm register={register} />
        <RadioButtonsSection control={control} />
        <AboveGroundInfo register={register} />
        <BelowGroundInfo register={register} />

        <Button type="submit" className={classes.saveBtn} variant="contained" color="secondary">
          Save & Continue
        </Button>
      </form>
    </div >
  )
}

export default ProjectSummary;