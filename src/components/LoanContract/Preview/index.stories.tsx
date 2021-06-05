import Preview from '.'
import LabeledBox from 'components/LabeledBox'

export default { title: 'Loan Contract Preview' }

export const Example = () => (
  <Preview
    knackId="12345"
    id="1057"
    maturityDate="01/01/2020"
    status="Paid Off"
    paidToDate="01/01/2020"
    paidOffDate="01/01/2020"
    amount="$400,000"
  />
)
export const WithLabeledBox = () => (
  <LabeledBox label="loan contract">
    <Preview
      knackId="12345"
      id="1057"
      maturityDate="01/01/2020"
      status="Paid Off"
      paidToDate="01/01/2020"
      paidOffDate="01/01/2020"
      amount="$400,000"
    />
  </LabeledBox>
)
