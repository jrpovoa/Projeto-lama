import * as jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { USER_ROLES } from "../types/User"

dotenv.config()

export interface AuthenticatonData {
    id: string,
    role: USER_ROLES
}

export class Authenticator {
    generate(input: AuthenticatonData): string {
        const token = jwt.sign(input, process.env.JWT_KEY as string, {
            expiresIn: process.env.JWT_EXPIRES_IN
        })
        return token
    }

    getTokenData(token: string): AuthenticatonData | null {
        try {
            const data = jwt.verify(token, process.env.JWT_KEY as string)
            return data as AuthenticatonData
        } catch (error) {
            return null
        }
    }
}