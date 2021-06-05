import { Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { ClientCompany } from './ClientCompany'
import { Users } from './Users'

@Entity('users_company', { schema: 'public' })
export class UsersCompany {
  @PrimaryGeneratedColumn({ type: 'integer' })
  _id: number

  @OneToOne(() => Users)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users

  @ManyToOne(() => ClientCompany)
  @JoinColumn([{ name: 'company_id', referencedColumnName: 'id' }])
  company: ClientCompany
}
