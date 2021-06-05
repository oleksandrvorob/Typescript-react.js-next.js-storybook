import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ClientEntity } from './ClientEntity';
import { Contact } from './Contact';

// @Index(['contact_id', 'client_entity_id'], { unique: true })
@Entity()
export class ClientEntityToContact {

  @Column()
  public title: string

  @Column({ name: "ownership", type: "decimal", precision: 2, scale: 2, nullable: false, default: 0 })
  public ownership: number

  @ManyToOne("Contact", 'clientEntities', { primary: true })
  @JoinColumn({ name: 'contact_id' })
  public contact!: Contact;

  @ManyToOne("ClientEntity", 'contacts', { primary: true })
  @JoinColumn({ name: 'client_entity_id' })
  public clientEntity!: ClientEntity;
}
