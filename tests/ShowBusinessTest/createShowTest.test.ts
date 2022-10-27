import { ShowBusiness } from "../../src/business/ShowBusiness"
import { BaseError } from "../../src/errors/BaseError"
import { ShowInputDTO } from "../../src/types/Show"
import { AuthenticatorMock } from "../mocks/services/AuthenticatorMock"
import { IdGeneratorMock } from "../mocks/services/IdGeneratorMock"
import { ShowDatabaseMock } from "../ShowDatabaseMock"

describe("Testing createShow from ShowBusiness", () => {
    const showBusiness = new ShowBusiness(
        new ShowDatabaseMock(),
        new AuthenticatorMock(),
        new IdGeneratorMock()
    )
    test("Success case", async () => {
        const input: ShowInputDTO = {
            token: "token-ninja",
            band: "Orochi",
            date: "2022-12-15"
        }
        const result = await showBusiness.createShow(input)
        expect(result.message).toEqual('Show created successfully!')
    })

    test("Error - Try to create show with NORMAL_USER", async () => {
        expect.assertions(2)
        try {
            const input: ShowInputDTO = {
                token: "token-mock",
                band: "Orochi",
                date: "2022-12-15"
            }
            await showBusiness.createShow(input)
        } catch (error) {
            if(error instanceof BaseError){
                expect(error.message).toEqual(`You don't have permission to do that request!`)
                expect(error.statusCode).toEqual(409)
            }
        }
    })

    test("Error - Try to create show while the festival haven't started yet.", async () => {
        expect.assertions(2)
        try {
            const input: ShowInputDTO = {
                token: "token-ninja",
                band: "Orochi",
                date: "2022-12-01"
            }
            await showBusiness.createShow(input)
        } catch (error) {
            if(error instanceof BaseError){
                expect(error.message).toEqual(`It's impossible to do a show in that date because the festival will not be happening.`)
                expect(error.statusCode).toEqual(409)
            }
        }
    })
})