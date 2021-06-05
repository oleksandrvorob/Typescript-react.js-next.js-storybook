import { FC } from 'react'
import { GetServerSideProps } from 'next'
import Link from '@material-ui/core/Link'

import MyLoanOverview from 'containers/MyLoanOverview'

const LoanPage: FC<{
  id: number
}> = ({ id }) => {
  // return (<div><Link href={`/loans/${id}/application-details/provide-loan-details`}>Loan Id {id}</Link></div>)
  return (<MyLoanOverview loanId={id} />)
}

export default LoanPage

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id } = query
  return { props: { id } }
}
