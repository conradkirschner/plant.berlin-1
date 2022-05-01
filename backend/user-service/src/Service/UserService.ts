import {getRepository} from "typeorm";
import {User} from "../Entity/User";
import {LoginRequest} from "../DTO/LoginRequest";
import {RegisterRequest} from "../DTO/RegisterRequest";
import {Encrypt} from "./Password";
import {UserResponse} from "../DTO/UserResponse";
import axios from "axios";

function makeid(length: number) {
    let result           = '';
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

export class UserService {
    userRepository = getRepository(User);

    login = async (loginRequest: LoginRequest) : Promise<UserResponse | null>=> {
        if (!loginRequest.username || !loginRequest.password) {
            return null;
        }
        const user = await this.userRepository.findOne({username: loginRequest.username});
        if (!user) {
            return null;
        }
        // can be used to block users
        if (!user.password) {
            return null;
        }

        if (!await Encrypt.comparePassword(loginRequest.password, user.password)){
            return null;
        }

        return {anzeigeName: user.anzeigeName, id: user.id};
    }

    register = async (registerRequest: RegisterRequest): Promise<boolean> => {
        if (!registerRequest.username || !registerRequest.password) {
            return false;
        }
        const result = await this.userRepository.findOne({username: registerRequest.username});
        if (!result) {
            const newAccount = this.userRepository.create({
                username: registerRequest.username,
                password: await Encrypt.cryptPassword(registerRequest.password),
                type: "user",
                anzeigeName: registerRequest.anzeigeName,
                emailVerification: makeid(24)
            })
            await this.userRepository.save(newAccount);
            if (!newAccount.id) {
                throw new Error("Could not save the User");
            }
            const userId =  newAccount.id;
            /**
             * Link Account with Baumscheiben Project
             **/
            debugger;
            if (!process.env.INTERNAL_API_TOKEN_BAUMSCHEIBEN_SERVICE) {
                throw new Error("Configuration Error - Please set internal Token");

            }
            const response = await axios.post(process.env.BAUMSCHEIBEN_SERVICE + '/baumscheibe/account', {}, {
                headers: {
                    "x-auth": process.env.INTERNAL_API_TOKEN_BAUMSCHEIBEN_SERVICE,
                    accountId: userId,
                }
            });
            if (response.status === 200) return true;
        }
        return false;
    }

    getUser = async (userId: string): Promise<UserResponse | null> => {
        const user = await this.userRepository.findOne({id: parseInt(userId)});
        if (!user) {
            return null;
        }

        return {id: user.id, anzeigeName: user.anzeigeName};
    }

}
