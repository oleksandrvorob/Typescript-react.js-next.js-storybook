import { FC } from 'react'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Link from '@material-ui/core/Link'

import Layout from 'components/Layout'
import QuoteForm from 'containers/LoanQuote/QuoteForm'

const LoansPage: FC<{
  id: string
}> = ({ id }) => {
  return (
    <Layout>
      <Card variant="outlined">
        <CardHeader title="Estimate Your Bridge Rate" />
        <CardContent>
          <QuoteForm />
        </CardContent>
      </Card>
    </Layout>
  )
}

export default LoansPage
