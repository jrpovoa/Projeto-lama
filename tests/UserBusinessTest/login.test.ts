import { UserBusiness } from "../../src/business/UserBusiness"
import { BaseError } from "../../src/errors/BaseError"
import { UserInputDTO } from "../../src/types/User"
import { AuthenticatorMock } from "../mocks/services/AuthenticatorMock"
import { HashManagerMock } from "../mocks/services/HashManagerMock"
import { IdGeneratorMock } from "../mocks/services/IdGeneratorMock"
import { UserDatabaseMock } from "../mocks/UserDatabaseMock"

describe("Testing login from UserBusiness", () => {

    const userBusiness = new UserBusiness(
        new UserDatabaseMock(),
        new HashManagerMock(),
        new IdGeneratorMock(),
        new AuthenticatorMock()
    )

    test("Success case", async () => {
        const input: UserInputDTO = {
            email: "ninja@gmail.com",
            password: "ninja123"
        }

        const result = await userBusiness.loginUser(input)

        expect(result.message).toEqual(`Login successfully!`)
        expect(result.token).toEqual("token-ninja")
    })

    test("Try to login with a not valid email", async () => {
        expect.assertions(2)
        try {
            const input: UserInputDTO = {
                email: "antunes@gmail.com",
                password: "ninja123"
            }

            await userBusiness.loginUser(input)
            
        } catch (error) {
            if(error instanceof BaseError){
                expect(error.message).toEqual(`Wrong email or password.`)
                expect(error.statusCode).toEqual(409)
            }
        }
    })
    test("Try to login with a not valid password", async () => {
        expect.assertions(2)
        try {
            const input: UserInputDTO = {
                email: "ninja@gmail.com",
                password: "bananinha123"
            }

            await userBusiness.loginUser(input)
            
        } catch (error) {
            if(error instanceof BaseError){
                expect(error.message).toEqual(`Wrong email or password.`)
                expect(error.statusCode).toEqual(409)
            }
        }
    })
})