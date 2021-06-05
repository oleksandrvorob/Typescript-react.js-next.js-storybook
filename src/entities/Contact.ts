import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index(['firstName', 'lastName', 'phone', 'email'], { unique: true })
@Entity('contact')
export class Contact {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ nullable: true })
  phone: number;

  @Column({ nullable: true })
  email: string;
}
