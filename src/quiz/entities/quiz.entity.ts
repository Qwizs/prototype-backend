import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Quiz {
    // attributs

    @PrimaryGeneratedColumn()
    public idQuiz: number;  // La clé primaire est générée automatiquement

    //@OneToMany(() => number, post => post.user)
    public idCategory: number;

    @Column()
    public name: string;
}
