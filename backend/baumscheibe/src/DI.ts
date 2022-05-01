import {BaumscheibenService} from "./Service/BaumscheibenService";
import {BaumscheibenAccountService} from "./Service/BaumscheibenAccountService";
import {PictureService} from "./Service/PictureService";
import {VoteService} from "./Service/VoteService";
import {MessageService} from "./Service/MessageService";

const dependencies: any = [];

export const getDependency = (key: string) => {
    return dependencies[key];
}
export const setDependency = (key: string, dependency: BaumscheibenService| BaumscheibenAccountService| PictureService| VoteService| MessageService) => {
    dependencies[key] = dependency;
}
