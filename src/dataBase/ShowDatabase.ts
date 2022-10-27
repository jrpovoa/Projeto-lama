import { Show, ShowDB, TicketDB } from "../types/Show";
import { BaseDatabase } from "./BaseDatabase";

export class ShowDatabase extends BaseDatabase {
    async insertShow(show: ShowDB): Promise<void> {

        await this.getConnection().insert(show).into('lama_shows')

    }

    async selectAllShows(): Promise<Show[] | undefined> {
        try {

            const response = await this.getConnection().select("*").from('lama_shows')

            const showModel = response.map((show) => {
                return Show.toShowModel(show)
            })

            return showModel
        } catch (error: any) {

            return undefined
        }
    }

    async verifyShowDate(date: string): Promise<ShowDB | undefined> {
        try {

            const response: ShowDB[] = await this.getConnection().select("*").from('lama_shows').where({ starts_at: date })

            return response[0]

        } catch (error: any) {

            return undefined

        }
    }

    async getShowById(id: string): Promise<Show | undefined> {

        const response = await this.getConnection().select("*").from('lama_shows').where({ id })

        return response[0] && Show.toShowModel(response[0])
    }

    async getTicketsById(id: string): Promise<number> {

        const response = await this.getConnection().select("*").from('lama_tickets').where({ show_id: id })

        return response.length

    }

    async findTicket(showId: string, userId: string): Promise<TicketDB | undefined> {

        const response: TicketDB[] = await this.getConnection().select("*").from('lama_tickets').where({ show_id: showId, user_id: userId })

        return response[0]

    }

    async createTicket(ticket: TicketDB): Promise<void>{

        await this.getConnection().insert(ticket).into('lama_tickets')

    }

    async cancelTicket(showId: string, userId: string): Promise<void>{
        await this.getConnection().delete().from('lama_tickets').where({ show_id: showId, user_id: userId })
    }
}