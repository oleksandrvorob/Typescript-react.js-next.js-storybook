import pg from 'pg'
import sqorn from '@sqorn/pg'
import { connectionString } from './utils'

export const List = async () => {
  const pool = new pg.Pool({ connectionString })
  const sq = sqorn({ pg, pool })

  const volYear = sq.from('charts_volume_year')
  const countStatus = sq.from('charts_loan_status')
  const volStatusState = sq.from('charts_volume_status_state')
  const volMonth = sq.from('charts_volume_month')
  const volAvg = sq.from('charts_volume_avg')
  const stateTimeline = sq.from('charts_state_timeline')

  return await Promise.all([volYear, countStatus, volStatusState, volMonth, volAvg, stateTimeline])
}
