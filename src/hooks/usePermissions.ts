import { useState } from 'react'
import useSWR from 'swr'

import { Permission } from 'entities/Permission'
import postRequest from 'utils/postRequest'

type PermissionResponse = [Permission[], number]

export interface PermissionStore {
  permissions: Permission[]
  permissionsCount: number
  error: any
  loadingPermissions: boolean
  createPermission: (name: string) => void
}

const usePermissions = () => {
  const [fetching, setFetching] = useState(false)
  const { data, error, isValidating, mutate } = useSWR<PermissionResponse>('/api/permissions')
  const loading = !data && !error
  const [permissions, permissionsCount] = data ? data : [[], 0]

  const loadingPermissions = loading || fetching

  const createPermission = async (name: string) => {
    setFetching(true)
    try {
      await postRequest(`/api/permissions`, JSON.stringify({ name }), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (e) {
      // setMessage(e, 'error')
    }
    setFetching(false)

    mutate()
  }

  return { permissions, permissionsCount, error, loadingPermissions, createPermission }
}

export default usePermissions
