import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { AddressStandardized } from './AddressStandardized'
import { ClientEntityType } from './ClientEntityType'

@Entity()
export class ClientEntity {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number

  @Column('text', { unique: true })
  name: string

  @Column('integer', { name: 'knack_auto_increment', unique: true, nullable: true })
  public knackAutoIncrement: number | null

  @Column('text', {
    name: 'knack_id',
    nullable: true,
    unique: true,
  })
  public knackId: string | null

  @Column('text', {
    name: 'knack_company_id',
    nullable: true,
  })
  knackCompanyId: string | null

  @ManyToOne("ClientEntityType")
  @JoinColumn([{ name: 'type_id', referencedColumnName: 'id' }])
  type: ClientEntityType

  // knack column
  @Column({ nullable: true })
  public cid: number

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne("AddressStandardized")
  @JoinColumn([{ name: 'address_id', referencedColumnName: 'id' }])
  addressStandardized: AddressStandardized
}
