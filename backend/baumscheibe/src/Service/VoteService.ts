import { getRepository } from "typeorm";
import {Vote} from "../Entity/Vote";
import {BaumscheibenAccount} from "../Entity/BaumscheibenAccount";
import {Baumscheibe} from "../Entity/Baumscheibe";

export class VoteService {

    voteRepository = getRepository(Vote);
    baumscheibenAccountRepository = getRepository(BaumscheibenAccount);
    baumscheibeRepository = getRepository(Baumscheibe);


   async createVote({from, to, rating}: {from: BaumscheibenAccount, to: string, rating: number}) {
        const baumscheibe = await this.baumscheibeRepository.findOne({
            where: {baumid: to},
            relations: ['votes', 'votes.from']
        });
        // check if vote exists if yes update vote instead
        if (!baumscheibe) return null;
        const exist = baumscheibe.votes?.find((currentBaumscheibenVote) => currentBaumscheibenVote.from.id === from.id);
        if (exist != undefined) {
            exist.rating = rating;
            await this.baumscheibeRepository.save(baumscheibe);
            return null;
        }

        const newVote = this.voteRepository.create({
            from: from,
            to: baumscheibe,
            rating: rating,
        });
        baumscheibe.votes.push(newVote);
        await this.baumscheibeRepository.save(baumscheibe);
        return true;
    }

    async getVote(baumId: string) {
        const baumscheibe = await this.baumscheibeRepository.findOne({
            where: {baumid: baumId},
            relations: ['votes']
        });
        const voteCounts = baumscheibe.votes.map(vote => vote.rating);
        const sum = voteCounts.reduce((a, b) => a + b, 0);
        const avg = (sum / voteCounts.length) || 0;
        return Math.ceil(avg);

    }
}
