import { ShowBusiness } from "../../src/business/ShowBusiness"
import { AuthenticatorMock } from "../mocks/services/AuthenticatorMock"
import { IdGeneratorMock } from "../mocks/services/IdGeneratorMock"
import { ShowDatabaseMock } from "../ShowDatabaseMock"

describe("Testing getShow from ShowBusiness", () => {
    const showBusiness = new ShowBusiness(
        new ShowDatabaseMock(),
        new AuthenticatorMock(),
        new IdGeneratorMock()
    )

    test("Success case", async () => {
        const result = await showBusiness.selectAllShows()
        expect(result?.length).toEqual(2)
    })
}
)