import {getRepository} from "typeorm";
import {getDependency} from "../DI";
import {BaumscheibenAccountService} from "./BaumscheibenAccountService";

import {Message} from "../Entity/Message";
import {BaumscheibenAccount} from "../Entity/BaumscheibenAccount";
import {Baumscheibe} from "../Entity/Baumscheibe";

export class MessageService {

    messagesRepository = getRepository(Message);
    baumscheibenAccountService: BaumscheibenAccountService = getDependency("BaumscheibenAccountService");

    addMessages = async (baumscheibe: Baumscheibe, user: BaumscheibenAccount, message: string,) => {
        const newMessage = await this.messagesRepository.create({
            message,
            from: user,
            baumscheibe: baumscheibe,
            encryption: "none",
            key: "",
            createdAt: new Date()
        })
        await this.messagesRepository.save(newMessage);
        return newMessage;
    }

}

