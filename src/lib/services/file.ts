import pg from 'pg'
import sqorn from '@sqorn/pg'
import _camel from 'camelcase-keys'
import { connectionString } from './utils'

interface FilePostRequest {
  name: string
  contentType: string
  s3Url: string
  s3Hash: string
  userId: number
}

export const Post = async (params: FilePostRequest) => {
  const pool = new pg.Pool({ connectionString })
  const sq = sqorn({ pg, pool })

  return await sq.from`file`.insert(params).return('id').one()
}

interface FindOneProps {
  name: string
}

// Find a file by its name
// Currently not taking into account bucket etc, not sure what that would help
export const FindOne = async ({ name }: FindOneProps) => {
  const pool = new pg.Pool({ connectionString })
  const sq = sqorn({ pg, pool })

  return await sq.from`file`.where`name = ${name}`.one()
}
