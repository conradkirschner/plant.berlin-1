import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";

import {BaumscheibenAccount} from "./BaumscheibenAccount";
import {Baumscheibe} from "./Baumscheibe";

@Entity()
export class Message {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    message?: string;

    @ManyToOne(() => BaumscheibenAccount, baumscheibenAccount => baumscheibenAccount.messages)
    from?: BaumscheibenAccount;

    @ManyToOne(() => Baumscheibe, baumscheibe => baumscheibe.messages)
    baumscheibe?: Baumscheibe;

    @Column()
    createdAt?: Date;

    @Column()
    encryption?: string;

    @Column()
    key?: string;

}
