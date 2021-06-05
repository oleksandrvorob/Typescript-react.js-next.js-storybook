import { FC } from 'react'

import LoanDetails from 'components/forms/LoanDetails'
import GuarantorForm from './GuarantorForm'

const GetForm: FC<{ taskName: string }> = ({ taskName }) => {
  switch (taskName) {
    case 'provide-flip-details':
      return <LoanDetails />
    case 'provide-guarantor-personal-information':
      return <GuarantorForm />
    default:
      return null
  }
}

export default GetForm