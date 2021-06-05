import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { Address } from './Address'
import { Country } from './Country'

@Index([
  'address1',
  'address2',
  'city',
  'state',
  'zipCode',
], { unique: true })
@Entity('address_standardized', { schema: 'public' })
export class AddressStandardized {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number

  @Column('text', { name: 'address_1' })
  address1: string

  @Column('text', { name: 'address_2', nullable: true })
  address2: string

  @Column('text', { name: 'city' })
  city: string

  @Column('text', { name: 'state' })
  state: string

  @Column('text', { name: 'zip_code' })
  zipCode: string

  @ManyToOne("Country")
  @JoinColumn([{ name: 'country_id', referencedColumnName: 'id' }])
  country: Country

  // Google place lookup
  @ManyToOne("Address")
  @JoinColumn([{ name: 'place_id', referencedColumnName: 'id' }])
  place: Address
}




