import React, { FC, ReactElement } from 'react'
import { makeStyles, Theme, useTheme, createStyles } from '@material-ui/core/styles'

import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

import MobileStepper from '@material-ui/core/MobileStepper'
import Button from '@material-ui/core/Button'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      flexBasis: 722,
    },
    header: {
      background: theme.palette.primary.main,
    },
    img: {
      height: 255,
      maxWidth: 400,
      overflow: 'hidden',
      display: 'block',
      width: '100%',
    },
  }),
)

interface Step {
  action?: ReactElement
  label: string
  component: ReactElement
}

const SideStepper: FC<{
  steps: Step[]
}> = ({ steps }) => {
  const classes = useStyles()
  const theme = useTheme()
  const [activeStep, setActiveStep] = React.useState(0)
  const maxSteps = steps.length

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  return (
    <Card elevation={1} className={classes.root}>
      <Box className={classes.header} padding="12px" display="flex" alignItems="center">
        <Typography variant="h5" style={{ color: 'white' }}>
          {steps[activeStep].label}
        </Typography>
        {steps[activeStep]?.action}
      </Box>
      {/* <CardHeader title={steps[activeStep].label} className={classes.header} /> */}
      <CardContent>{steps[activeStep].component}</CardContent>
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="dots"
        activeStep={activeStep}
        style={{ background: 'transparent', marginTop: 'auto' }}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
            Next
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
          </Button>
        }
      />
    </Card>
  )
}

export default SideStepper
