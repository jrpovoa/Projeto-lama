import { BaseDatabase } from "../../src/dataBase/BaseDatabase"
import { User, USER_ROLES } from "../../src/types/User"

export class UserDatabaseMock extends BaseDatabase {
    async insertUser(user: User): Promise<void> {
       
    }

    async getUserByEmail(email: string): Promise<User | undefined> {

        switch (email) {
            case ("ninja@gmail.com"):
                return User.toUserModel({
                    id: "1f681cbc-82fa-4885-9943-35e04eacdcd4",
                    name: "Ninja",
                    email: "ninja@gmail.com",
                    password: "$12$iGerazW5yQVSVnNQ6CzLYOEDluf6CL6aOGEGwJKgUNRxik3t2lDHS",
                    role: USER_ROLES.ADMIN
                })
            default: return undefined
        }
    }
}