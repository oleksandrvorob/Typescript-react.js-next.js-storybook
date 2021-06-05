import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

// relations
import { Users } from './Users'
import { LoanContract } from './LoanContract'

@Index(['drawNumber', 'loanId'], { unique: true })
@Index(['loanId', 'requestedAmount', 'requestedDate'], { unique: true })
@Entity('draw_request', { schema: 'public' })
export class DrawRequest {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  id: string

  @Column('character varying', { name: 'knack_id', unique: true, nullable: true })
  knackId: string

  @Column('integer', { name: 'loan_id' })
  loanId: number

  @ManyToOne('LoanContract')
  @JoinColumn({ name: 'loan_id' })
  loanContract: LoanContract

  @Column('integer', { name: 'draw_number' })
  drawNumber: number

  @Column('enum', {
    name: 'status',
    enum: [
      'held',
      'new',
      'inspection ordered',
      'inspection approved',
      'approved',
      'funded',
      'reimbursed',
    ],
    default: "new",
  })
  status:
    | 'held'
    | 'new'
    | 'inspection ordered'
    | 'inspection approved'
    | 'approved'
    | 'funded'
    | 'reimbursed'

  @Column('money', { name: 'approved_amount', nullable: true })
  approvedAmount: string | null

  @Column('money', { name: 'approved_amount_to_date', nullable: true })
  approvedAmountToDate: string | null

  @Column('text', { name: 'notes', nullable: true })
  notes: string | null

  @Column('money', { name: 'requested_amount' })
  requestedAmount: string

  @Column('timestamp with time zone', { name: 'requested_date' })
  requestedDate: Date

  @Column('timestamp with time zone', { name: 'draw_date', nullable: true })
  drawDate: Date

  @Column('timestamp with time zone', { name: 'approved_date', nullable: true })
  approvedDate: Date | null

  @Column('timestamp with time zone', {
    name: 'disbursed_date',
    nullable: true,
  })
  disbursedDate: Date | null

  @Column('money', { name: 'reimbursed_amount', nullable: true })
  reimbursedAmount: string

  @Column('timestamp with time zone', { name: 'reimbursed_date', nullable: true })
  reimbursedDate: Date

  @Column('text', { name: 'manual_draw_id', nullable: true })
  manualDrawId: string | null

  @Column('money', { name: 'inspection_fee', nullable: true })
  inspectionFee: string | null

  @Column('money', { name: 'wire_fee', nullable: true })
  wireFee: string | null

  @Column('boolean', { name: 'active', default: () => 'true' })
  active: boolean

  @ManyToOne(() => Users)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users
}
