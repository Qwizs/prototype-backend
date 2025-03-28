import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Media {
  @PrimaryGeneratedColumn()
  idMedia: number;

  @Column()
  type: string;

  @Column()
  content: string;
}