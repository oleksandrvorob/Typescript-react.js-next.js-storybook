import { Column, Entity, Index, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { UsersPermissions } from './UsersPermissions'

// @Index('UQ_97672ac88f789774dd47f7c8be3', ['email'], { unique: true })
@Entity('users', { schema: 'public' })
export class Users {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number

  @Column('character varying', { name: 'name', nullable: true })
  name: string | null

  @Column('character varying', { name: 'email', nullable: true, unique: true })
  email: string | null

  @Column('timestamp with time zone', {
    name: 'email_verified',
    nullable: true,
  })
  emailVerified: Date | null

  @Column('character varying', { name: 'image', nullable: true })
  image: string | null

  @Column('timestamp with time zone', {
    name: 'created_at',
    default: () => 'now()',
  })
  createdAt: Date

  @Column('timestamp with time zone', {
    name: 'updated_at',
    default: () => 'now()',
  })
  updatedAt: Date

  @OneToMany('UsersPermissions', 'user')
  permissions: UsersPermissions[]

  hasPermission(name: string) {
    return this.permissions.map((item) => item.permission.name).includes(name)
  }
}
