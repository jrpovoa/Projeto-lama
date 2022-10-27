import { ShowBusiness } from "../../src/business/ShowBusiness"
import { BaseError } from "../../src/errors/BaseError"
import { TicketInputDTO } from "../../src/types/Show"
import { AuthenticatorMock } from "../mocks/services/AuthenticatorMock"
import { IdGeneratorMock } from "../mocks/services/IdGeneratorMock"
import { ShowDatabaseMock } from "../ShowDatabaseMock"

describe("Testing deleteTicket from ShowBusiness", () => {
    const showBusiness = new ShowBusiness(
        new ShowDatabaseMock(),
        new AuthenticatorMock(),
        new IdGeneratorMock()
    )

    test("Case of success", async () => {
        const input: TicketInputDTO = {
            token: "token-ninja",
            showId: "b6879ee3-697b-4957-8e57-d7beb37a0d33"
        }

        const result = await showBusiness.cancelTicket(input)
        expect(result.message).toEqual(`You cancelled your ticket successfully!`)
    })

    test("Error - try to delete ticket without make login", async () => {
        expect.assertions(2)
        try {
            const input: TicketInputDTO = {
                token: "asasdasd123",
                showId: "b6879ee3-697b-4957-8e57-d7beb37a0d33"
            }

            await showBusiness.cancelTicket(input)
        } catch (error) {
            if(error instanceof BaseError){
                expect(error.message).toEqual('Token not authorized!')
                expect(error.statusCode).toEqual(409)
            }
        }
    })
})