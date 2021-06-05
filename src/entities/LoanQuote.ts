import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

import { Users } from './Users'


@Entity('loan_quote', { schema: 'public' })
export class LoanQuote {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('character varying', { name: 'property_state', nullable: true, length: 2 })
  propertyState: string

  @Column({ name: 'estimated_fico', nullable: true })
  estimatedFico: string

  // SHOULD REFERENCE ANOTHER TABLE???
  @Column({ name: 'property_type', nullable: true })
  propertyType: string

  @Column({ name: 'transaction_type', nullable: true })
  transactionType: string

  @Column('money', { name: 'base_loan_amount', nullable: true })
  baseLoanAmount: string | null

  @Column({ name: 'rehab_required', nullable: true })
  rehabRequired: boolean

  @Column('money', { name: 'estimated_rehab_amount', nullable: true })
  estimatedRehabAmount: string | null

  @Column('money', { name: 'after_repair_value', nullable: true })
  afterRepairValue: string | null

  @Column("double precision", { name: 'broker_percentage', nullable: true })
  brokerPercentage: number;

  @ManyToOne("Users")
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
