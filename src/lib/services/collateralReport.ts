import pg from 'pg'
import sqorn from '@sqorn/pg'
import _camel from 'camelcase-keys'
import { connectionString } from './utils'

interface CollateralReportPostRequest {
  fileId: string
  reportDate: string
  status: string
}

const TABLE_NAME = 'collateral_report'

export const Post = async (params: CollateralReportPostRequest) => {
  const pool = new pg.Pool({ connectionString })
  const sq = sqorn({ pg, pool })

  return await sq.from(TABLE_NAME).insert(params).return('id').one()
}

interface FindOneProps {
  reportDate: string
}

// Find a report by its date
export const FindOne = async ({ reportDate }: FindOneProps) => {
  const pool = new pg.Pool({ connectionString })
  const sq = sqorn({ pg, pool })

  return await sq.from(TABLE_NAME).where`report_date = ${reportDate}`.one()
}
