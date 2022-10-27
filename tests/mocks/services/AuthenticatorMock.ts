import { USER_ROLES } from "../../../src/types/User"

export interface AuthenticatonData {
    id: string,
    role: USER_ROLES
}

export class AuthenticatorMock {
    generate(input: AuthenticatonData): string {

        switch (input.id) {
            case "1f681cbc-82fa-4885-9943-35e04eacdcd4":
                return "token-ninja"
            default:
                return "token-mock"
        }
    }

    getTokenData(token: string): AuthenticatonData | null {
        switch (token) {
            case "token-mock":
                return {
                    id: "id-mock",
                    role: USER_ROLES.NORMAL
                }
            case "token-ninja":
                return {
                    id: "1f681cbc-82fa-4885-9943-35e04eacdcd4",
                    role: USER_ROLES.ADMIN
                }
            default: return null
        }
    }
}