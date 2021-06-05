import useSWR from 'swr'

export interface DrawerStats {
  fundDrawsCount: number | null
  drawReimbursementsCount: number | null
  mutateDrawerStats: () => void
}

const useDrawerStats = () => {
  const { data, error, isValidating, mutate: mutateDrawerStats } = useSWR<DrawerStats>(
    '/api/drawer-stats'
  )
  const loadingDrawerStats = !data && !error

  const { fundDrawsCount, drawReimbursementsCount } = data || { fundDrawsCount: null, drawReimbursementsCount: null }

  return { fundDrawsCount, drawReimbursementsCount, loadingDrawerStats, mutateDrawerStats }
}

export default useDrawerStats
