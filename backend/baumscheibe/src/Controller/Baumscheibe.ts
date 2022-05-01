/* this is needed to get types @see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/47780 */
// @ts-ignore
import whatever from 'multer';

import {
    Controller, Delete,
    Get, Patch, Path, Post,
    Route, Request, Body, Header,
} from "tsoa";
import {getDependency} from "../DI";
import {PictureService} from "../Service/PictureService";
import express from "express";
import {VoteService} from "../Service/VoteService";
import {UploadVoteToBaumscheibe} from "../DTO/UploadVoteToBaumscheibe";
import {BaumscheibenService} from "../Service/BaumscheibenService";
import {CreateNewBaumscheibeRequest} from "../DTO/CreateNewBaumscheibeRequest";
import {BaumscheibenAccountService} from "../Service/BaumscheibenAccountService";
import {BulkStatusRequest} from "../DTO/BulkStatusRequest";
import {BulkStatusResponse} from "../DTO/BulkStatusResponse";
import {MessageService} from "../Service/MessageService";
import {NewMessageRequest} from "../DTO/NewMessageRequest";

@Route("baumscheibe/baumscheibe")
export class GetTile extends Controller {

    baumscheibenService: BaumscheibenService = getDependency("BaumscheibenService");
    pictureService: PictureService = getDependency("PictureService");
    voteService: VoteService = getDependency("VoteService");
    baumscheibenAccountService: BaumscheibenAccountService = getDependency("BaumscheibenAccountService");
    messageService: MessageService = getDependency("MessageService");

    @Get("/{id}")
    public async getBaumscheibe(
        @Path() id: string,
    ): Promise<any> {
        return this.baumscheibenService.getBaumscheibe(id);
    }
    @Post("/bulk")
    public async getBaumscheibenBulk(
        @Body() bulkRequest: BulkStatusRequest
    ): Promise<BulkStatusResponse> {
        const baumscheiben = await this.baumscheibenService.getBaumscheibenBulk(bulkRequest);

        const result = [];
        for (let i = 0; i < bulkRequest.baumids.length; i++) {
            const foundMatch = baumscheiben.find((baumscheibe) => baumscheibe.baumid === bulkRequest.baumids[i]);
            if (foundMatch) {
                result.push({
                        baumid: bulkRequest.baumids[i],
                        type: foundMatch.type
                    })
            } else {
                result.push({
                    baumid: bulkRequest.baumids[i],
                    type: 3  // not defined yet
                })
            }
        }

        return result;

    }

    @Post("/")
    public async createBaumscheibe(
        @Header('x-auth') userId: string,
        @Body() createBaumscheibenRequest: CreateNewBaumscheibeRequest,
    ): Promise<any> {
        console.log(userId);
        await this.baumscheibenService.createNewBaumscheibe(
            createBaumscheibenRequest.baumid,
            createBaumscheibenRequest.type,
            userId
        );
        return true;
    }

    @Patch("/")
    public async updateBaumscheibe(
        @Header('x-auth') userId: string,
        @Body() createBaumscheibenRequest: CreateNewBaumscheibeRequest,
    ): Promise<any> {
        await this.baumscheibenService.updateBaumscheibenStatus(createBaumscheibenRequest.baumid, createBaumscheibenRequest.type, userId);
        return true;
    }

    @Post("/votes")
    public async updateBaumscheibeVotes(
        @Header('x-auth') userId: string,
        @Body() voteParameter: UploadVoteToBaumscheibe
    ): Promise<any> {
        const baumscheibe = this.baumscheibenService.getBaumscheibe(voteParameter.to);
        const user = await this.baumscheibenAccountService.getUser(userId);
        if (!baumscheibe) return;
        if (!user) return;

        await this.voteService.createVote({...{from: user}, ...voteParameter});
        return true;
    }

    @Get("/votes/{baumId}")
    public async getBaumscheibeVotes(
        @Path() baumId: string,
    ): Promise<number> {
        return await this.voteService.getVote(baumId);;
    }

    @Post("/{id}/pictures")
    public async updateBaumscheibePictures(
        @Path() id: string,
        @Header('x-auth') userId: string,
        @Request() request: express.Request,
    ): Promise<any> {

        const baumscheibe = await this.baumscheibenService.getBaumscheibe(id);
        const user = await this.baumscheibenAccountService.getUser(userId);
        if (!baumscheibe) return;
        if (!user) return;

        await this.pictureService.store(request, user, baumscheibe);

        return true;
    }

    @Get("/{id}/pictures")
    public async getBaumscheibePictures(
        @Path() id: string,
    ): Promise<any> {
        return await this.baumscheibenService.getPictures(id);
    }

    @Get("/{id}/me")
    public async getMyBaumscheiben(
        @Path() id: string,
    ): Promise<any> {
        return await this.baumscheibenService.getPictures(id);
    }


    @Get("/{id}/messages")
    public async getBaumscheibeMessages(
        @Path() id: string,
    ): Promise<any> {
        return await this.baumscheibenService.getMessages(id);
    }


    @Post("/{id}/messages")
    public async newBaumscheibeMessages(
        @Path() id: string,
        @Header('x-auth') userId: string,
        @Body() newMessageRequest: NewMessageRequest
    ): Promise<any> {
        const baumscheibe = await this.baumscheibenService.getBaumscheibe(id);
        const user = await this.baumscheibenAccountService.getUser(userId);
        if (!baumscheibe) return;
        if (!user) return;
        await this.messageService.addMessages(baumscheibe, user, newMessageRequest.message)
        return true;
    }




    // unverified
    @Delete("/{id}")
    public async removeBaumscheibe(
        @Path() id: string,
    ): Promise<any> {
        console.log('@todo implement it -> Should delete -> ',id);
        /*await this.baumscheibenService.deleteBaumscheibe(id);*/
        return true;
    }

}
