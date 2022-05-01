import {getRepository, In} from "typeorm";
import {Baumscheibe, BaumscheibenTypes} from "../Entity/Baumscheibe";
import {getDependency} from "../DI";
import {BaumscheibenAccountService} from "./BaumscheibenAccountService";
import {BulkStatusRequest} from "../DTO/BulkStatusRequest";

export class BaumscheibenService {
    baumscheibeRepository = getRepository(Baumscheibe);
    messageeRepository = getRepository(Baumscheibe);

    userService = getDependency('BaumscheibenAccountService') as BaumscheibenAccountService;
    getBaumscheibe = async (id: string) => {
        return await this.baumscheibeRepository.findOne({where: {baumid: id}, relations:['createFrom']});
    }
    getBaumscheibenBulk = async (bulkRequest: BulkStatusRequest) => {
        return await this.baumscheibeRepository.find({where: {baumid: In(bulkRequest.baumids)}});
    }
    createNewBaumscheibe = async (baumId: string, type: BaumscheibenTypes, userId: string) => {
        const user = await this.userService.getUser(userId);
        if (!user) return;

        const baumscheibe = this.baumscheibeRepository.create({
            baumid: baumId,
            type: type,
            createFrom: user,
            createdAt: new Date(),
        });
        await this.baumscheibeRepository.save(baumscheibe);
    }

    updateBaumscheibenStatus = async (baumid: string, type: BaumscheibenTypes, userId: string) => {
        const user = await this.userService.getUser(userId);
        if (!user) return;

        const baumscheibe = await this.getBaumscheibe(baumid);
        if (!baumscheibe) return;

        // Overwrite the attributes, we don't need history of log
        baumscheibe.type = type;
        baumscheibe.createdAt = new Date();
        baumscheibe.createFrom = user;

        debugger;
        await this.baumscheibeRepository.save(baumscheibe);

        return;
    }

    getPictures = async (baumId: string) => {
        const baumscheibe = await this.baumscheibeRepository.findOne({where: {baumid: baumId}, relations:['pictures']});
        if (!baumscheibe) return [];

        return baumscheibe.pictures;

    }


    getMessages = async (baumId: string) => {
        const baumscheibe = await this.baumscheibeRepository.findOne({where: {baumid: baumId}, relations:['messages', 'messages.from']});
        if (!baumscheibe) return [];
        return baumscheibe.messages;
    }

    deleteBaumscheibe = async (baumId: string) => {
        const baumscheibe = await this.getBaumscheibe(baumId)
        if (!baumscheibe) return;
        await this.baumscheibeRepository.delete(baumscheibe);
    }

}


