import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";

import {Message} from "./Message";
import {Vote} from "./Vote";
import {BaumscheibenAccount} from "./BaumscheibenAccount";
import {Picture} from "./Picture";

export enum BaumscheibenTypes {
    isEmpty,
    notAllowed,
    isPlanted,
    notDefined,
}
@Entity()
export class Baumscheibe {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    baumid?: string;

    @Column('int')
    type?: BaumscheibenTypes;

    @OneToMany(() => Picture, picture => picture.baumscheibe, { cascade: ['insert', 'update'] })
    pictures?: Picture[];

    @OneToMany(() => Vote, vote => vote.to, { cascade: ['insert', 'update'] })
    votes?: Vote[];

    @OneToMany(() => Message, message => message.baumscheibe, { cascade: ['insert', 'update'] })
    messages?: Message[];

    @ManyToOne(() => BaumscheibenAccount, baumscheibenAccount => baumscheibenAccount.baumscheiben )
    createFrom?: BaumscheibenAccount;

    @Column()
    createdAt?: Date;

}
