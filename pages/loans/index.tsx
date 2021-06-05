import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'

import Layout from 'components/Layout'
import QuoteForm from 'containers/LoanQuote/QuoteForm'

const LoansPage = () => {
  return (
    <Layout>
      <Link href="/loans/123">Loan 123</Link>
      {/* <QuoteForm /> */}
      <Button href="/loans/new" variant="outlined" color="primary" size="large">
        New Loan
      </Button>
    </Layout>
  )
}

export default LoansPage
