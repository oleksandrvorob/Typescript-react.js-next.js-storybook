import 'reflect-metadata'
import { Connection, createConnection } from 'typeorm'

// entities
import { Address } from 'entities/Address'
import { DrawRequest } from 'entities/DrawRequest'
import { DrawRequestReimbursement } from 'entities/DrawRequestReimbursement'
import { Fci } from 'entities/Fci'
import { InspectionVendor } from 'entities/InspectionVendor'
import { LoanContract } from 'entities/LoanContract'
import { Users } from 'entities/Users'
import { UsersPermissions } from 'entities/UsersPermissions'
import { Permission } from 'entities/Permission'
import { LoanQuote } from 'entities/LoanQuote'

// subscribers
import DrawRequestReimbursementSubscriber from 'subscribers/DrawRequestReimbursementSubscriber'

export const initializeDatabase = async (
  optionOverrides: Record<string, any> = {},
): Promise<Connection> => {
  const options: any = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    schema: 'public',
    synchronize: false,
    log: true,
    entities: [
      Address,
      DrawRequest,
      DrawRequestReimbursement,
      Fci,
      InspectionVendor,
      LoanContract,
      Users,
      UsersPermissions,
      Permission,
      LoanQuote,
    ],
    // subscribers: [DrawRequestReimbursementSubscriber],
    // migrations: [__dirname + '/migrations/*.ts'],
    ...optionOverrides,
  }

  const connection = await createConnection(options)

  return connection
}

export default initializeDatabase
