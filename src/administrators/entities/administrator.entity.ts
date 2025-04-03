import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Administrator {
    // attributs

    @PrimaryGeneratedColumn()
    public idAdministrator: number;  // La clé primaire est générée automatiquement

    @Column()
    public username: string;

    @Column()
    public password: string;
}
