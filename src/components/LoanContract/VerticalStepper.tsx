import { Stepper, Step, StepLabel, StepContent } from '@material-ui/core'
import StatX from 'components/atoms/StatX'
import StatRow from 'components/atoms/StatRow'
import { getTwitterDate } from 'lib/utils'

export default ({ steps = [] }) => {
  steps.sort((a, b) => (a.rowId > b.rowId ? 1 : -1))
  return (
    <Stepper orientation="vertical">
      {steps.map(({ rowId, lenderName, status, updatedAt }) => (
        <Step key={rowId} active>
          <StepLabel>{lenderName}</StepLabel>
          <StepContent>
            <StatRow>
              <StatX value={status} />
              <StatX label="updated" value={getTwitterDate(updatedAt)} />
            </StatRow>
          </StepContent>
        </Step>
      ))}
    </Stepper>
  )
}
