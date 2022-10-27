import { BaseDatabase } from "../src/dataBase/BaseDatabase"
import { Show, ShowDB, TicketDB } from "../src/types/Show"

export class ShowDatabaseMock extends BaseDatabase {
    async insertShow(show: ShowDB): Promise<void> {
    }

    async selectAllShows(): Promise<Show[] | undefined> {
        const shows = [
            {
                id: "b6879ee3-697b-4957-8e57-d7beb37a0d33",
                band: "Djonga",
                starts_at: new Date("2022-12-11"),
                tickets: 4999
            },
            {
                id: "bece7ba5-eb40-4674-9909-b7b5673d49aa",
                band: "Justin Bieber",
                starts_at: "2022-12-14T03:00:00.000Z",
                tickets: 5000
            }
        ]
        const showModel = shows.map((show) => {
            return Show.toShowModel(show)
        })

        return showModel
    }

    public verifyShowDate = async (date: string): Promise<ShowDB | undefined> => {
        switch (date) {
            case "11":
                return {
                    id: "b6879ee3-697b-4957-8e57-d7beb37a0d33",
                    band: "Djonga",
                    starts_at: new Date("2022-12-11")
                }
        }
    }

    async getShowById(id: string): Promise<Show | undefined> {
        switch (id) {
            case "b6879ee3-697b-4957-8e57-d7beb37a0d33":
                return Show.toShowModel({
                    id: "b6879ee3-697b-4957-8e57-d7beb37a0d33",
                    band: "Djonga",
                    starts_at: "2022-12-11T03:00:00.000Z",
                    tickets: 5000
                })
            default:
                return undefined;
        }
    }

    async getTicketsById(id: string): Promise<number> {
        switch (id) {
            case "b6879ee3-697b-4957-8e57-d7beb37a0d33":
                return 1
            default:
                return 0
        }

    }

    async findTicket(showId: string, userId: string): Promise<TicketDB | undefined> {
        if(showId === "b6879ee3-697b-4957-8e57-d7beb37a0d33") {
            switch (userId) {
            case "1f681cbc-82fa-4885-9943-35e04eacdcd4":
                return {
                    id: "de19cf9b-a10e-424a-8624-17c94a561519",
                    show_id: "b6879ee3-697b-4957-8e57-d7beb37a0d33",
                    user_id: "1f681cbc-82fa-4885-9943-35e04eacdcd4"
                }
            default:
                break
        }
        return undefined
    }
}

    async createTicket(ticket: TicketDB): Promise<void> {

}

    async cancelTicket(showId: string, userId: string): Promise<void> {
}
}