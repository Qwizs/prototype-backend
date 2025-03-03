import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class AnswerQuestion {
  @PrimaryColumn()
  idQuestion: number;

  @PrimaryColumn()
  idAnswer: number;

  @Column({ type: 'boolean', nullable: true })
  state?: boolean;

  @Column({ type: 'int', nullable: true })
  order?: number;
}
