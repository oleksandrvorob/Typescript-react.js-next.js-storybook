import { DrawRequest } from 'lib/interfaces'
import useSWR from 'swr'


const drawHistory = (loanId: number): [DrawRequest[], Error, boolean] => {
  const { data, error, isValidating } = useSWR<DrawRequest[]>(
    loanId && `/api/loancontract/${loanId}/draw-requests`,
  )
  const loading = !data && !error

  data && data.sort((a, b) => (a.drawNumber > b.drawNumber ? 1 : -1))

  return [data, error, loading || isValidating]
}

export default drawHistory
