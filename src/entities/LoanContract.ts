import { Column, Entity, Index, JoinColumn, ManyToOne, OneToOne, OneToMany } from 'typeorm'
import { Address } from './Address'
import { Fci } from './Fci'
import { DrawRequestReimbursement } from './DrawRequestReimbursement'
import { DrawRequest } from './DrawRequest'

// @Index('UQ_fc936741f6f43f3afa2d79d7fe1', ['fciLoanId'], { unique: true })
// @Index('UQ_0c7b3c544d572f73edcf87592b1', ['knackId'], { unique: true })
// @Index('UQ_58f8109369a08b442b392c798eb', ['lid'], { unique: true })
@Entity('loan_contract', { schema: 'public' })
export class LoanContract {
  @Column('integer', { primary: true, name: 'id' })
  id: number

  @Column('integer', { name: 'cid' })
  clientId: number

  @Column('character varying', { name: 'lid', unique: true })
  lid: string

  @Column('character varying', { name: 'borrower_name' })
  borrowerName: string

  @Column('integer', { name: 'lien_position', nullable: true })
  lienPosition: number | null

  @Column('character varying', { name: 'full_address' })
  fullAddress: string

  @Column('character varying', { name: 'address_line_1', nullable: true })
  addressLine1: string

  @Column('character varying', { nullable: true })
  city: string

  @Column('character varying', { nullable: true, length: 2 })
  state: string

  @Column('character varying', { name: 'zip_code', nullable: true, length: 5 })
  zipCode: string

  @Column('character varying', { name: 'status' })
  status: string

  @Column('date', { name: 'maturity_date', nullable: true })
  maturityDate: string | null

  @Column('date', { name: 'paid_to_date', nullable: true })
  paidToDate: string | null

  @Column('date', { name: 'paid_off_date', nullable: true })
  paidOffDate: string | null

  @Column('date', { name: 'funding_date', nullable: true })
  fundingDate: string | null

  @Column('character varying', {
    name: 'knack_id',
    nullable: true,
    unique: true,
  })
  knackId: string | null

  @Column('character varying', { name: 'fci_main', nullable: true })
  fciMain: string | null

  // @Column('integer', { name: 'fci_loan_id', nullable: true, unique: true })
  // fciLoanId: number | null

  @OneToOne(() => Fci)
  @JoinColumn([{ name: "fci_loan_id", referencedColumnName: "loanId" }])
  fci: Fci;

  // @OneToOne('Address', 'property')
  // @JoinColumn([{ name: 'address_id', referencedColumnName: 'id' }])
  // address2: Address

  @Column('character varying', { name: 'transaction_state', nullable: true })
  transactionState: string | null

  @Column('money', { name: 'amount', nullable: true })
  amount: string | null

  @Column('boolean', { name: 'active', default: () => 'false' })
  active: boolean

  @Column('boolean', { name: 'accounting_open', default: () => 'false' })
  accountingOpen: boolean

  @Column('money', { name: 'rehab_budget', nullable: true })
  rehabBudget: string | null

  @Column('money', { name: 'approved_holdback', nullable: true })
  approvedHoldback: string | null

  @ManyToOne('Address', 'loanContracts')
  @JoinColumn([{ name: 'address_id', referencedColumnName: 'id' }])
  address: Address

  @OneToMany('DrawRequestReimbursement', 'loanContract')
  reimbursements: DrawRequestReimbursement[]

  @OneToMany('DrawRequest', 'loanContract')
  drawRequests: DrawRequest[]
}
