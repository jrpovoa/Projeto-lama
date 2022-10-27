import { User } from "../types/User";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
    async insertUser(user: User): Promise<void> {
        await this.getConnection().insert(user).into('lama_user')
    }

    async getUserByEmail(email: string): Promise<User | undefined> {

        try {
            const response: User[] = await this.getConnection().select("*").where({ email }).from('lama_user')
            return response[0] && User.toUserModel(response[0])

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
}