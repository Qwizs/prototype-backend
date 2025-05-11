import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  idAnswer: number;

  @Column()
  value: string;
}
