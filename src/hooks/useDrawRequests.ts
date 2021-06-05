import { useContext, useState } from 'react'
import useSWR from 'swr'

import { DrawRequest } from 'entities/DrawRequest'
// import { DrawRequestReimbursement } from 'entities/DrawRequestReimbursement'
import post from 'utils/postRequest'
import { AppContext } from 'lib/appContext'

type DrawRequestResponse = [DrawRequest[], number]

export interface DrawRequestStore {
  drawRequests: DrawRequest[]
  drawRequestsCount: number
  loadingDrawRequests: boolean
  patchDrawRequest: (drawRequestId: string, data: Partial<DrawRequest>) => void
}

const useDrawRequests = () => {
  const [loading, setLoading] = useState(false)
  const { setMessage, drawerStats } = useContext(AppContext)
  const { data, error, isValidating, mutate } = useSWR<DrawRequestResponse>('/api/v1/draw-requests')

  const { mutateDrawerStats } = drawerStats

  const [drawRequests, drawRequestsCount] = data ? data : [[], 0]

  const patchDrawRequest = async (drawRequestId: string, data: Partial<DrawRequest>) => {
    setLoading(true)

    try {
      await post(`/api/draw-requests/${drawRequestId}`, JSON.stringify(data), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (e) {
      console.error(e)
      setMessage(e, 'error')
      setLoading(false)
    }

    mutate()
    mutateDrawerStats()
    setLoading(false)
  }

  const loadingDrawRequests = (!data && !error) || loading

  return {
    drawRequests,
    drawRequestsCount,
    loadingDrawRequests,
    patchDrawRequest,
  }
}

export default useDrawRequests
