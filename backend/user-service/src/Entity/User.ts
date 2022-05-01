import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    type?: string;

    @Column()
    username?: string;

    @Column()
    anzeigeName?: string;

    @Column()
    password?: string;

    @Column({
        unique: true,
        nullable: true,
    })
    emailVerification?: string;

}
