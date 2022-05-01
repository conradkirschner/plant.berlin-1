import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";

import {Vote} from "./Vote";
import {Message} from "./Message";
import {Picture} from "./Picture";
import {Baumscheibe} from "./Baumscheibe";


@Entity()
export class BaumscheibenAccount {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    userId?: string;

    @Column()
    type?: string;

    @OneToMany(() => Vote, vote => vote.from)
    votes?: Vote[];

    @OneToMany(() => Baumscheibe, baumscheibe => baumscheibe.createFrom )
    baumscheiben?: Baumscheibe[];

    @OneToMany(() => Message, messages => messages.from)
    messages?: Message[];

    @OneToMany(() => Picture, picture => picture.from)
    pictures?: Picture[];
}
