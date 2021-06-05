import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { ClientEntity } from './ClientEntity'

@Entity('client_company', { schema: 'public' })
export class ClientCompany {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number

  @Column('text', { name: 'company_name', unique: true })
  companyName: string | null

  @Column('text', { name: 'contact_name', nullable: true })
  contactName: string | null

  @Column('text', { name: 'contact_email', nullable: true })
  contactEmail: string | null

  // @OneToMany("Client")
  // // @OneToMany(() => ClientEntity, (clientEntity) => clientEntity.company)
  // entities: ClientEntity[]
}
