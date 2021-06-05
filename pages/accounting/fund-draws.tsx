import FundDrawsContainer from 'containers/FundDraws'
import Layout from 'components/Layout'

import AccountingStore from 'stores/AccountingStore'

const FundDraws = () => {
  return (
    <Layout>
      <AccountingStore>
        <FundDrawsContainer />
      </AccountingStore>
    </Layout>
  )
}

export default FundDraws
