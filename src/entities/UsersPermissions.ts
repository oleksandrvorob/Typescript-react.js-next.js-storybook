import { Entity, JoinColumn, ManyToOne } from 'typeorm'
import { Users } from './Users'
import { Permission } from './Permission'

@Entity('users_permissions', { schema: 'public' })
export class UsersPermissions {
  @ManyToOne(() => Users, (user) => user.id, { primary: true })
  @JoinColumn({ name: 'user_id' })
  user: Users

  @ManyToOne((_type) => Permission, (permission) => permission.id, { primary: true })
  @JoinColumn({ name: 'permission_id' })
  permission: Permission
}
