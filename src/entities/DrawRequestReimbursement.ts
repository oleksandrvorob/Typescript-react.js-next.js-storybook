import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { LoanContract } from './LoanContract'

@Entity('draw_request_reimbursement', { schema: 'public' })
export class DrawRequestReimbursement {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number

  @Column('money')
  amount: string

  @Column('timestamp with time zone', { name: 'reimbursed_date' })
  reimbursedDate: Date

  @ManyToOne('LoanContract', { eager: true })
  @JoinColumn([{ name: 'loan_id', referencedColumnName: 'id' }])
  loanContract: LoanContract
}
