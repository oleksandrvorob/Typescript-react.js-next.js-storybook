import DrawReimbursementsContainer from 'containers/DrawReimbursements'
import Layout from 'components/Layout'

import DrawReimbursementStore from 'stores/DrawReimbursementStore'

const Accounting = () => {
  return (
    <Layout>
      <DrawReimbursementStore>
        <DrawReimbursementsContainer />
      </DrawReimbursementStore>
    </Layout>
  )
}

// Admin.getInitialProps = async (ctx) => {
//   const res = await get('user')
//   const [users, count] = await res.json()
//   return { users, count }
// }

export default Accounting
