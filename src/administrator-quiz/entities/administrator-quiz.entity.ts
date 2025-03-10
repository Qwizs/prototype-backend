import { PrimaryGeneratedColumn } from 'typeorm';

export class AdministratorQuiz {
    @PrimaryGeneratedColumn()
    public idAdministrator: number;  // La clé primaire est générée automatiquement

    @PrimaryGeneratedColumn()
    public idQuiz: number;

}
