import {
    Controller,
    Post, Path, Request,
    Route, Get, Body,
} from "tsoa";
import {getDependency} from "../DI";
import {LoginRequest} from "../DTO/LoginRequest";
import {UserResponse} from "../DTO/UserResponse";
import {RegisterRequest} from "../DTO/RegisterRequest";
import {UserService} from "../Service/UserService";
import express from "express";

@Route("user")
export class User extends Controller {
    userService:UserService = getDependency("UserService");

    @Post("/login")
    public async login(
        @Body() request: LoginRequest
    ): Promise<UserResponse| null> {
        return this.userService.login(request);
    }


    @Post("/register")
    public async register(
        @Request() request: express.Request,
        @Body() registerRequest: RegisterRequest
    ): Promise<any> {
        const response = (<any>request).res as express.Response;
        if (registerRequest.password2 != registerRequest.password) {
            response.redirect('/user/Register?failed=notEqual');
            return;
        }
        if (!registerRequest["confirm-agb"]) {
            response.redirect('/user/Register?failed=agb');
            return;
        }
        if(!await this.userService.register(registerRequest)) {
            response.redirect('/user/Register?failed');
            return;
        }
        // @todo maybe add automatically signIn
        response.redirect("/user/SignIn");
        return;
    }

    /**
     * Gets public user data
     * @param accountId
     */
    @Get("/{accountId}")
    public async getAccountInformation(
        @Path() accountId: string,
    ): Promise<UserResponse|null> {
        return this.userService.getUser(accountId);
    }
}
