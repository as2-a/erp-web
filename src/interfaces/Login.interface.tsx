import { User } from "./User.interface";

export interface Login {
    code: number;
    data: boolean;
    message: string;
    user: User;
}