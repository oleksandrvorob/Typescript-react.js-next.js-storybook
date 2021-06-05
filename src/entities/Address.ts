import { Column, Entity, Index, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Fci } from './Fci'
import { LoanContract } from './LoanContract'
// import { Property } from './Property'

@Index(['formatted'], { unique: true })
@Index(['googlePlaceId'], { unique: true })
@Entity('address', { schema: 'public' })
export class Address {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number

  @Column('character varying', { name: 'google_place_id', unique: true })
  googlePlaceId: string

  @Column('character varying', { name: 'formatted', unique: true })
  formatted: string

  @Column('character varying', { name: 'street_line_1' })
  streetLine1: string

  @Column('character varying', { name: 'city' })
  city: string

  @Column('character varying', { name: 'state' })
  state: string

  @Column('character varying', { name: 'zip_code' })
  zipCode: string

  @Column('json', { name: 'google' })
  google: object

  @OneToMany('Fci', 'address')
  fcis: Fci[]

  @OneToMany('LoanContract', 'address')
  loanContracts: LoanContract[]

  // @OneToOne('Property', 'address2')
  // property: Property
}
