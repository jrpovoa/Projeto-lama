import { ShowDatabase } from "../dataBase/ShowDatabase";
import { Conflict } from "../errors/Conflict";
import { MissingFields } from "../errors/MissingFields";
import { ValueTypeError } from "../errors/ValueTypeError";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";
import { Show, ShowDB, ShowInputDTO, TicketDB, TicketInputDTO, TicketOutputDTO } from "../types/Show";

export class ShowBusiness {

    constructor(
        private showDatabase: ShowDatabase,
        private authenticator: Authenticator,
        private idGenerator: IdGenerator
    ) {}

    public createShow = async (input: ShowInputDTO) => {

        const { token, band, date } = input

        if (!token) {
            throw new MissingFields()
        }

        // const authenticator = new Authenticator()

        const verifyToken = this.authenticator.getTokenData(token)

        if (!verifyToken) {
            throw new Conflict('Token not authorized!')
        }

        if (verifyToken.role !== "ADMIN") {
            throw new Conflict(`You don't have permission to do that request!`)
        }

        if (!band || !date) {
            throw new MissingFields()
        }

        if (typeof band !== 'string') {
            throw new ValueTypeError(`Value 'band' must be a string`)
        }

        if (typeof date !== 'string') {
            throw new ValueTypeError(`Value 'date' must be a string`)
        }

        const [day, month, year] = date.split('/')

        const startsAt = new Date(`${year}-${month}-${day}`)

        const lastDate: Date = new Date(`2022-12-05`)

        const verifyDate = startsAt.getTime() - lastDate.getTime()

        if (verifyDate <= 0) {
            throw new Conflict(`It's impossible to do a show in that date because the festival will not be happening.`)
        }

        // const showDatabase = new ShowDatabase()

        const dateArgument = `${year}-${month}-${Number(day) - 1}`

        const verifyShowDate = await this.showDatabase.verifyShowDate(dateArgument)

        if (verifyShowDate) {
            throw new Conflict('This date is not avaliable.')
        }

        const id = this.idGenerator.generateId()

        const show: ShowDB = { id, band, starts_at: startsAt }

        await this.showDatabase.insertShow(show)

        const response = {
            message: 'Show created successfully!'
        }

        return response
    }

    public selectAllShows = async () => {

        // const showDatabase = new ShowDatabase()

        const getShows = await this.showDatabase.selectAllShows()

        for (let show of getShows!) {
            const ticket = await this.showDatabase.getTicketsById(show.getId())
            show.setTickets(show.getTickets() - ticket)
        }

        const response = getShows

        return response

    }

    public buyTicket = async (input: TicketInputDTO): Promise<TicketOutputDTO> => {

        const { token, showId } = input

        if (!token) {
            throw new MissingFields()
        }

        // const authenticator = new Authenticator()

        const tokenData = this.authenticator.getTokenData(token)

        if (!tokenData) {
            throw new Conflict('Token not authorized!')
        }

        if (!showId) {
            throw new MissingFields()
        }

        // const showDatabase = new ShowDatabase()

        const findShowById = await this.showDatabase.getShowById(showId)

        if (!findShowById) {
            throw new Conflict('Show not found')
        }

        const soldTickets = await this.showDatabase.getTicketsById(showId)

        const show = new Show(
            findShowById.getId(),
            findShowById.getBand(),
            findShowById.getStartsAt(),
            5000 - soldTickets
        )

        if (show.getTickets() === 0) {
            throw new Conflict("The tickets are sold out!")
        }

        const alreadyHaveTicket = await this.showDatabase.findTicket(showId, tokenData.id)

        if (alreadyHaveTicket) {
            throw new Conflict("You already have tickets for this show!")
        }

        const ticket: TicketDB = {
            id: this.idGenerator.generateId(),
            show_id: showId,
            user_id: tokenData.id
        }

        await this.showDatabase.createTicket(ticket)

        const response: TicketOutputDTO = {
            message: "Ticket has been bought successfully!"
        }

        return response
    }

    public cancelTicket = async (input: TicketInputDTO) => {
        const { token, showId } = input

        if (!token) {
            throw new MissingFields()
        }

        // const authenticator = new Authenticator()

        const tokenData = this.authenticator.getTokenData(token)

        if (!tokenData) {
            throw new Conflict('Token not authorized!')
        }

        if (!showId) {
            throw new MissingFields()
        }

        // const showDatabase = new ShowDatabase()

        const findShowById = await this.showDatabase.getShowById(showId)

        if (!findShowById) {
            throw new Conflict('Show not found')
        }

        const haveTicket = await this.showDatabase.findTicket(showId, tokenData.id)

        if (!haveTicket) {
            throw new Conflict(`You dont't have a ticket for that show!`)
        }

        await this.showDatabase.cancelTicket(showId, tokenData.id)

        const response = {
            message: `You cancelled your ticket successfully!`
        }

        return response
    }
}