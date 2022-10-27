import { ShowBusiness } from "../../src/business/ShowBusiness"
import { BaseError } from "../../src/errors/BaseError"
import { TicketInputDTO } from "../../src/types/Show"
import { AuthenticatorMock } from "../mocks/services/AuthenticatorMock"
import { IdGeneratorMock } from "../mocks/services/IdGeneratorMock"
import { ShowDatabaseMock } from "../ShowDatabaseMock"

describe("Testing buyTicket from ShowBusiness", () => {
    const showBusiness = new ShowBusiness(
        new ShowDatabaseMock(),
        new AuthenticatorMock(),
        new IdGeneratorMock()
    )

    test("Success case", async () => {
        const input: TicketInputDTO = {
            token: "token-mock",
            showId: "b6879ee3-697b-4957-8e57-d7beb37a0d33"
        }

        const result = await showBusiness.buyTicket(input)
        expect(result.message).toEqual("Ticket has been bought successfully!")
    })

    test("Error - Wrong token", async () => {
        expect.assertions(2)
        try {
            const input: TicketInputDTO = {
                token: "token-mocke",
                showId: "b6879ee3-697b-4957-8e57-d7beb37a0d33"
            }
            await showBusiness.buyTicket(input)
        } catch (error) {
            if(error instanceof BaseError){
                expect(error.message).toEqual('Token not authorized!')
                expect(error.statusCode).toEqual(409)
            }
        }
    })
    test("Error - Wrong Show Id", async () => {
        expect.assertions(2)
        try {
            const input: TicketInputDTO = {
                token: "token-mock",
                showId: "b6879ee3-697b-4957-8e57-d7beb37a0d333123"
            }
            await showBusiness.buyTicket(input)
        } catch (error) {
            if(error instanceof BaseError){
                expect(error.message).toEqual('Show not found')
                expect(error.statusCode).toEqual(409)
            }
        }
    })
})