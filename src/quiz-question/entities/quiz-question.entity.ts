import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class QuizQuestion {
  @PrimaryColumn()
  idQuiz: number;

  @PrimaryColumn()
  idQuestion: number;

  @Column({ type: 'int', nullable: true })
  order?: number;    
}
