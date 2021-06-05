import { withKnobs, number, boolean } from '@storybook/addon-knobs'
import DrawCalculator from '.'

export default { title: 'Draw Calculator', decorators: [withKnobs] }

export const asDynamicVariables = () => {
  const sampleData = {
    rehabBudget: number('rehab budget', 220000),
    approvedHoldback: number('approved holdback', 200000),
    borrowerShare: number('borrower share', 0),
    requestedAmount: number('requested amount', 50000),
    eligibleAmount: number('eligible amount', 75000),
    completePercentage: 50,
    allowedAmount: number('allowed amount', 0),
    approvedAmountToDate: 200000,
    loading: boolean('loading', false),
    disbursedAmount: 80000,
    disbursedAmountWithCurrent: 280000,
  }

  return <DrawCalculator {...sampleData} status="new" />
}
