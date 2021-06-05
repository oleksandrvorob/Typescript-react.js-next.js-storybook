import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('country', { schema: 'public' })
export class Country {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number

  @Column("character varying", { length: 2, unique: true })
  name: string;
}
