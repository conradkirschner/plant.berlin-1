import {getRepository} from "typeorm";
import {BaumscheibenAccount} from "../Entity/BaumscheibenAccount";

export class BaumscheibenAccountService {
    baumscheibenAccountRepository = getRepository(BaumscheibenAccount);

    createUser = async (userId: string, type="user") => {
        const result = await this.baumscheibenAccountRepository.findOne({userId});
        if (!result) {
            const newAccount = this.baumscheibenAccountRepository.create({
                userId: userId,
                type: type
            })
            await this.baumscheibenAccountRepository.save(newAccount);
        }
        return "";
    }
    getUser = async (userId: string) => {
        return await this.baumscheibenAccountRepository.findOne({userId});
    }

    deleteUser = async (userId: string) => {
        return await this.baumscheibenAccountRepository.delete({userId});
    }

}
