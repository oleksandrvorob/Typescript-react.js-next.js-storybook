import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class ClientEntityType {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number

  @Column('text', { unique: true })
  name: string

}
