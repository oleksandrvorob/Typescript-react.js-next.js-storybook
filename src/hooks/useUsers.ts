import { useState } from 'react'
import useSWR from 'swr'

import { Users } from 'entities/Users'
import postRequest from 'utils/postRequest'

type UsersResponse = [Users[], number]

export interface UsersStore {
  users: Users[]
  usersCount: number
  error: any
  loadingUsers: boolean
  addPermission: (userId: number, permissionId: number) => void
  deletePermission: (userId: number, permissionId: number) => void
}

const useUsers = () => {
  const [fetching, setFetching] = useState(false)
  const { data, error, isValidating, mutate } = useSWR<UsersResponse>('/api/users')
  const loading = !data && !error
  const [users, usersCount] = data ? data : [[], 0]

  const loadingUsers = loading || fetching

  const addPermission = async (userId: number, permissionId: number) => {
    setFetching(true)
    try {
      await postRequest(`/api/users/${userId}/permissions/${permissionId}`, JSON.stringify({}), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (e) {
      console.error(e)
      // setMessage(e, 'error')
    }
    setFetching(false)

    mutate()
  }

  const deletePermission = async (userId: number, permissionId: number) => {
    setFetching(true)
    try {
      await postRequest(`/api/users/${userId}/permissions/${permissionId}`, JSON.stringify({}), {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (e) {
      console.error(e)
      // setMessage(e, 'error')
    }

    setFetching(false)
    mutate()
  }

  return { users, usersCount, error, loadingUsers, addPermission, deletePermission }
}

export default useUsers
