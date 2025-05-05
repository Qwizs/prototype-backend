import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class AdministratorQuiz {
    // attributs
    @PrimaryColumn()
    public idAdministrator: number;  // La clé primaire est générée automatiquement

    @PrimaryColumn()
    public idQuiz: number;
}
