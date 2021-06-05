import ContentBox from '../ContentBox'
import VerticalStepper from './VerticalStepper'

export default (row) => (
  <>
    <ContentBox title="fci" data={row?.fci ? { steps: row.fci } : {}} component={VerticalStepper} />
  </>
)
