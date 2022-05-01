import {User} from "../Entity/User";

export type RegisterRequest = Pick<User, 'username'| 'password' | 'anzeigeName' >
    & {
    password2: string,
    "confirm-agb"?: boolean,
}
