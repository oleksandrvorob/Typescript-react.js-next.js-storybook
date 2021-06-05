import AdminContainer from 'containers/Admin'

import AdminStore from 'stores/AdminStore'

const Admin = () => {
  return (
    <AdminStore>
      <AdminContainer />
    </AdminStore>
  )
}

// Admin.getInitialProps = async (ctx) => {
//   const res = await get('user')
//   const [users, count] = await res.json()
//   return { users, count }
// }

export default Admin
