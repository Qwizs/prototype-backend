import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  idAnswer: number;

  @Column()
  value: string;
}