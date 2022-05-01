import {
    Controller,
    Post, Path,
    Route, Get, Delete, Header,
} from "tsoa";
import {getDependency} from "../DI";

@Route("baumscheibe/account")
export class Account extends Controller {
    baumscheibenAccountService = getDependency("BaumscheibenAccountService");

    @Get("/{accountId}")
    public async getAccountInformation(
        @Path() accountId: string,
    ): Promise<any> {
        return this.baumscheibenAccountService.getUser(accountId);
    }

    /**
     * Internal API
     * @param accountId
     * @param username
     */
    @Post("/")
    public async linkNewAccount(
        @Header() accountId: string,
        @Header("x-auth") username: string,
    ): Promise<any> {
        console.log('got auth request', username)
        return this.baumscheibenAccountService.createUser(accountId);
    }

    @Delete("/")
    public async unlinkAccount(
        @Header() accountId: string,
    ): Promise<any> {
        return this.baumscheibenAccountService.createUser(accountId);
    }

}
