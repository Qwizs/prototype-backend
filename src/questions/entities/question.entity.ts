import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum QuestionType {
  SIMPLE_CHOICE = 'simpleChoice',
  MULTIPLE_CHOICE = 'multipleChoice',
  INPUT = 'input',
  ORDER = 'order',
}

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  idQuestion: number;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: QuestionType,
  })
  type: QuestionType;

  @Column({ type: 'int' })
  duration: number;

  @Column({ type: 'int' })
  score: number;
}
