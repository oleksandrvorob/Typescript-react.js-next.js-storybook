import { Typography, Link } from "@material-ui/core"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formTitle: {
      marginBottom: theme.spacing(2),
      fontWeight: "bold"
    },
    formDescription: {
      marginBottom: theme.spacing(2),
    },
    bottomM: {
      marginBottom: theme.spacing(1)
    }, topM: {
      marginTop: theme.spacing(2)
    }
  }),
)

const HeadSection = () => {
  const classes = useStyles();
  return (
    <>
      <Typography className={classes.formTitle} variant="h4" >Project Summary</Typography>

      <Typography className={classes.formDescription} variant="body1">
        Please provide insight in the scope of work, quality of interior finishes, any room/home conversions, any square footage adds, and any relevant redesign(s). The level of detail will impact the accuracy of your After-Repair Valuation.
      </Typography>

      <Typography className={classes.bottomM}>
        <Link href="#" color="inherit">
          Learn how to submit your Scope of Work
      </Link>
      </Typography>

      <Typography className={classes.bottomM}>
        <Link href="#" color="inherit">
          Scope of Work Submission Tips
      </Link>
      </Typography>

    </>
  )
}

export default HeadSection