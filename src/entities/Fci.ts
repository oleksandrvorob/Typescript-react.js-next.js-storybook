import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { Address } from './Address'

@Entity('fci', { schema: 'public' })
export class Fci {
  @Column('integer', { primary: true, name: 'loan_id' })
  loanId: number

  @Column('character varying', { name: 'borrower_name' })
  borrowerName: string

  @Column('character varying', { name: 'full_address' })
  fullAddress: string

  @Column('character varying', { name: 'city' })
  city: string

  @Column('character varying', { name: 'state' })
  state: string

  @Column('integer', { name: 'zip', nullable: true })
  zip: number | null

  @Column('date', { name: 'funding_date' })
  fundingDate: string

  @Column('date', { name: 'origination_date', nullable: true })
  originationDate: string | null

  @Column('money', { name: 'current_balance', nullable: true })
  currentBalance: string | null

  @Column('money', { name: 'total_original_balance' })
  totalOriginalBalance: string

  @Column('money', { name: 'original_balance', nullable: true })
  originalBalance: string | null

  @Column('money', { name: 'total_payment', nullable: true })
  totalPayment: string | null

  @Column('integer', { name: 'lien_position' })
  lienPosition: number

  @Column('character varying', { name: 'status' })
  status: string

  @Column('date', { name: 'maturity_date', nullable: true })
  maturityDate: string | null

  @Column('date', { name: 'paid_to_date', nullable: true })
  paidToDate: string | null

  @Column('date', { name: 'next_due_date', nullable: true })
  nextDueDate: string | null

  @Column('date', { name: 'paid_off_date', nullable: true })
  paidOffDate: string | null

  @Column('timestamp without time zone', { name: 'updated_at' })
  updatedAt: Date

  @Column('text', { name: 'lender_name', nullable: true })
  lenderName: string | null

  @ManyToOne('Address', 'fcis')
  @JoinColumn([{ name: 'address_id', referencedColumnName: 'id' }])
  address: Address
}
