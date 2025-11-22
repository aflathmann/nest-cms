import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('messages')
export class MessageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  content: string;

  @Column()
  ownerId: string;

  @Column()
  title: string;
}
