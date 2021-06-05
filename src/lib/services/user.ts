import pg from 'pg'
import sqorn from '@sqorn/pg'
// @ts-ignore
import { Row } from '@sqorn/pg/types'
import { connectionString } from './utils'
import bcrypt from 'bcryptjs'

/**
 * Passport local uses `username`, but we are going by email.
 * @param user, obj containing username and password
 */
export async function findUser({ username, password }) {
  const pool = new pg.Pool({ connectionString })
  const sq = sqorn({ pg, pool })

  const sql = sq.from('public.user').where`email = ${username}`

  let match: boolean
  let user: Row

  try {
    user = await sql.one()
    match = await bcrypt.compare(password, user?.password)
  } catch (e) {
    throw new Error(e)
  }

  if (match) {
    return { ...user }
  }

  throw new Error(`invalid password`)
}
