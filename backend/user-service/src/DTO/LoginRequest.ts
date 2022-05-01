import {User} from "../Entity/User";

export type LoginRequest = Pick<User, 'username'| 'password' | 'id' >
