import { createContext, FunctionComponent, useContext } from 'react'

import useUsers, { UsersStore } from 'hooks/useUsers'
import usePermissions, { PermissionStore } from 'hooks/usePermissions'

interface Context {
  usersData: UsersStore
  permissionData: PermissionStore
}

export const AdminContext = createContext<Context | undefined>(undefined)

const Store: FunctionComponent = ({ children }) => {
  const usersData = useUsers()
  const permissionData = usePermissions()

  return (
    <AdminContext.Provider value={{ usersData, permissionData }}>{children}</AdminContext.Provider>
  )
}

function useAdminStore() {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error('useAdminStore must be used within a AdminContext Provider')
  }
  return context
}

export { useAdminStore }

export default Store
