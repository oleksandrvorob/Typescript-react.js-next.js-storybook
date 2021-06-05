import { useEffect } from 'react'
import Router from 'next/router'
import useSWR from 'swr'

interface Props {
  redirectTo: string
  redirectIfFound?: boolean
}

export default function useUser({ redirectTo, redirectIfFound = false }: Props) {
  const { data, mutate, error } = useSWR('/api/auth')

  const user = data?.user ?? null
  const finished = Boolean(data)
  const hasUser = Boolean(user)

  if (hasUser) {
    user.isExec = () => (user?.permissions ? user.permissions.includes('exec') : false)
    user.isAdmin = () => (user?.permissions ? user.permissions.includes('admin') : false)
  }

  useEffect(() => {
    if (!redirectTo || !finished) return
    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !hasUser) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && hasUser)
    ) {
      Router.push(redirectTo)
    }
  }, [redirectTo, redirectIfFound, finished, hasUser])

  return { user, error, mutateUser: mutate }
}
