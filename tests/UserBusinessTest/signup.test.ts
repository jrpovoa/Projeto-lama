import { UserBusiness } from "../../src/business/UserBusiness"
import { BaseError } from "../../src/errors/BaseError"
import { LoginInputDTO, USER_ROLES } from "../../src/types/User"
import { AuthenticatorMock } from "../mocks/services/AuthenticatorMock"
import { HashManagerMock } from "../mocks/services/HashManagerMock"
import { IdGeneratorMock } from "../mocks/services/IdGeneratorMock"
import { UserDatabaseMock } from "../mocks/UserDatabaseMock"

describe("Testing user signup of UserBusiness", () => {
const userBusiness = new UserBusiness(
    new UserDatabaseMock(),
    new HashManagerMock(),
    new IdGeneratorMock(),
    new AuthenticatorMock()
)
    test("Success case", async () => {
        const input: LoginInputDTO = {
            name: "Lucas",
            email: "lucas@gmail.com",
            password: "lucas123",
            role: USER_ROLES.NORMAL
        }

        const result = await userBusiness.createUser(input)
        expect(result.message).toEqual(`User '${input.name}' has been created!`)
        expect(result.token).toEqual("token-mock")
    })

    test("Error - Try to signup with an email that already exists in the database", async () => {
        expect.assertions(2)
        try {

            const input: LoginInputDTO = {
                name: "Ninja",
                email: "ninja@gmail.com",
                password: "lucas123",
                role: USER_ROLES.NORMAL
            }
    
            await userBusiness.createUser(input)
            
        } catch (error) {
            if(error instanceof BaseError){
                expect(error.message).toEqual(`Email already exists.`)
                expect(error.statusCode).toEqual(409)
            }
        }
    })
    test("Error - Try to signup with a password that have less than 6 characters", async () => {
        expect.assertions(2)
        try {

            const input: LoginInputDTO = {
                name: "Lucas",
                email: "lucas@gmail.com",
                password: "lucas",
                role: USER_ROLES.NORMAL
            }
    
            await userBusiness.createUser(input)
            
        } catch (error) {
            if(error instanceof BaseError){
                expect(error.message).toEqual(`Input 'password' should have at least 6 characters.`)
                expect(error.statusCode).toEqual(401)
            }
        }
    })
})