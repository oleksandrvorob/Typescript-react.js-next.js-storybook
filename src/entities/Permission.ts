import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('permission', { schema: 'public' })
export class Permission {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number

  @Column('character varying', { unique: true })
  name: string
}
