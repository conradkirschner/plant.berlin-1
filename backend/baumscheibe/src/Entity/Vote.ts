import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";

import {BaumscheibenAccount} from "./BaumscheibenAccount";
import {Baumscheibe} from "./Baumscheibe";

@Entity()
export class Vote {

    @PrimaryGeneratedColumn()
    id?: number;

    @ManyToOne(() => BaumscheibenAccount, baumscheibenAccount => baumscheibenAccount.votes)
    from?: BaumscheibenAccount;
    @ManyToOne(() => Baumscheibe, baumscheibe => baumscheibe.votes)
    to: Baumscheibe;

    @Column()
    rating?: number;

}
