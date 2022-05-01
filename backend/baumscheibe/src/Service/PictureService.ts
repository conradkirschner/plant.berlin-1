import express from "express";
import {getRepository} from "typeorm";
import {Picture} from "../Entity/Picture";
import {getDependency} from "../DI";
import {BaumscheibenAccountService} from "./BaumscheibenAccountService";
import {BaumscheibenAccount} from "../Entity/BaumscheibenAccount";
import * as fs from "fs";
import {Baumscheibe} from "../Entity/Baumscheibe";

const multer = require('multer')



const uploader = multer({
    limits: { fieldSize: 25 * 1024 * 1024 },
    dest: process.env.PICTURE_TEMP_PATH,
});
export class PictureService {
    pictureRepository = getRepository(Picture);
    baumscheibenAccountService: BaumscheibenAccountService = getDependency("BaumscheibenAccountService");

    /**
     * Uploads a file into the upload folder, move file then into image folder
     *
     * @param request
     * @param user
     */
   async store(request: express.Request, user: BaumscheibenAccount, baumscheibe: Baumscheibe) {
        const multerSingle = uploader.single('file');
        const stored = await new Promise((resolve, reject) => {
             multerSingle(request, undefined, async (error: any) => {
                if (error) {
                    reject(error);
                }
                resolve(true);
            });
        });
        debugger;
        if (stored && request.file) {
            const endingSplit = request.file.originalname.split('.');
            const ending = endingSplit[endingSplit.length - 1];
            // path + unique id + timestamp + any image ending
            const fileName = `${makeid(28)}.${+new Date()}.${ending}`;

            // move file to persist and keep link in database

            fs.renameSync(request.file.path, `${process.env["PICTURE_UPLOAD_PATH"]}/${fileName}`);
            const newPicture = this.pictureRepository.create({
                pictureLink: fileName,
                from: user,
                baumscheibe,
            });
            await this.pictureRepository.save(newPicture);
            return true;
        }
        return false;
    }

}

function makeid(length: number) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

