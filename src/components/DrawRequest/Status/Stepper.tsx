import { FunctionComponent } from 'react'

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Tooltip from '@material-ui/core/Tooltip'
import StepIcon, { StepIconProps } from '@material-ui/core/StepIcon'
import Typography from '@material-ui/core/Typography'
import ErrorIcon from '@material-ui/icons/Error'

import Date from 'components/atoms/Date'
import Flex from 'components/Flex'

import { DrawRequest, Inspection } from 'lib/interfaces'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  }),
)

const useIconStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      color: theme.palette.warning.light,
    },
  }),
)

interface IconProps extends StepIconProps {
  warning: boolean
}

const Icon: FunctionComponent<IconProps> = ({ warning, icon, ...props }) => {
  const styles = useIconStyles()
  return (
    <StepIcon
      {...props}
      icon={
        warning ? (
          <Tooltip title="Pending manager review">
            <ErrorIcon className={styles.icon} />
          </Tooltip>
        ) : (
          icon
        )
      }
    />
  )
}

interface Props {
  drawRequest: Partial<DrawRequest>
  inspection: Partial<Inspection> | null
}

export default function DrawRequestStepper({ drawRequest, inspection }: Props) {
  const classes = useStyles()

  const steps = [
    { status: 'new', date: drawRequest.requestedDate },
    { status: 'inspection ordered', date: inspection?.orderedDate },
    { status: 'inspection approved', date: inspection?.approvedDate },
    { status: 'approved', date: drawRequest.approvedDate },
    { status: 'funded', date: drawRequest.disbursedDate },
  ]

  const activeStep = steps.findIndex((x) => x.status === drawRequest.status) + 1
  const lastStep = steps.filter((x) => !!x.date).length

  const held = drawRequest?.status === 'held'

  const displayActiveStep = held ? lastStep : activeStep
  const isError = (index: number) => index === displayActiveStep && held

  const isPending =
    !!drawRequest.approvedAmount &&
    !drawRequest.approvedDate &&
    drawRequest?.status === 'inspection approved'

  return (
    <div className={classes.root}>
      <Stepper activeStep={displayActiveStep} alternativeLabel>
        {steps.map(({ status, date }, index) => (
          <Step key={status}>
            <StepLabel
              error={isError(index)}
              // @ts-ignore
              StepIconProps={{ warning: status === 'approved' && isPending }}
              StepIconComponent={Icon}
            >
              <Flex direction="column" align="center" data-testid={`stepper-${status}`}>
                <Typography variant="caption" data-testid={`stepper-${status}-label`}>
                  {isError(index) ? 'held' : status}
                </Typography>
                {index === 3 && isPending && (
                  <Typography variant="caption" color="textSecondary">
                    (Pending manager approval)
                  </Typography>
                )}
                {!!date && (
                  <div data-testid={`stepper-${status}-date`}>
                    <Date value={date} />
                  </div>
                )}
              </Flex>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  )
}
