import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Users } from './Users'

@Entity('client_upload', { schema: 'public' })
export class ClientUpload {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number

  @Column('character varying', { name: 'box_id', nullable: false, unique: true })
  boxId: string

  @Column('character varying', { nullable: false })
  name: string

  @Column('integer', { nullable: false })
  size: number

  @Column('jsonb')
  meta: any

  @Column('timestamp without time zone', {
    name: 'created_at',
    default: () => 'now()',
  })
  createdAt: Date

  @Column('timestamp without time zone', {
    name: 'updated_at',
    default: () => 'now()',
  })
  updatedAt: Date

  @ManyToOne(() => Users)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users
}
