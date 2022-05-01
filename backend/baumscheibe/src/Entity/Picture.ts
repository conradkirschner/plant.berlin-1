import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";

import {BaumscheibenAccount} from "./BaumscheibenAccount";
import {Baumscheibe} from "./Baumscheibe";

@Entity()
export class Picture {

    @PrimaryGeneratedColumn()
    id?: number;

    @ManyToOne(() => BaumscheibenAccount, baumscheibenAccount => baumscheibenAccount.pictures)
    from?: BaumscheibenAccount;

    @ManyToOne(() => Baumscheibe, baumscheibe => baumscheibe.votes)
    baumscheibe?: Baumscheibe;

    @Column()
    pictureLink?: string;


}
