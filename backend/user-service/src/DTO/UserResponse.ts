import {User} from "../Entity/User";

export type UserResponse = Pick<User, 'anzeigeName' | 'id'>
