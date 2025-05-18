import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';

@Entity()
export class Quiz {
    // attributs

    @PrimaryGeneratedColumn()
    public idQuiz: number;  // La clé primaire est générée automatiquement

    // @ManyToOne(() => Category)
    // @JoinColumn({ name: 'idCategory' })  // Spécifie le nom de la colonne de clé étrangère
    // public idCategory: number;

    @Column()
    public idCategory: number; // 👈 juste l'id, comme tu veux

    @Column()
    public idAdministrator: number;

    @Column()
    public name: string;
}
