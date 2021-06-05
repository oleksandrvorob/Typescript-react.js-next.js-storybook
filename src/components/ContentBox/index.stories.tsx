import * as React from 'react'

import VerticalStepper from '../LoanContract/VerticalStepper'
import Component from '.'

export default { title: 'ContentBox' }

const data = {
  steps: [{ rowId: 1, lenderName: 'Quanta', status: 'Paid Off', paidOffDate: '2020-01-03' }],
}

export const Empty = () => <Component title={'fci'} data={{}} component={VerticalStepper} />

export const withData = () => <Component title={'fci'} data={data} component={VerticalStepper} />
