import {UserService} from "./Service/UserService";

const dependencies: any = [];

export const getDependency = (key: string) => {
    return dependencies[key];
}
export const setDependency = (key: string, dependency: UserService) => {
    dependencies[key] = dependency;
}
