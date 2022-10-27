export class Show {
    constructor(
        private id: string,
        private band: string,
        private starts_at: Date,
        private tickets: number = 5000
    ) { }

    static toShowModel(data: any): Show {
        return new Show(data.id, data.band, data.starts_at, data.tickets)
    }

    getId() {
        return this.id
    }

    getBand() {
        return this.band
    }

    getStartsAt() {
        return this.starts_at
    }

    getTickets() {
        return this.tickets
    }

    public setTickets(newTicket: number) {
        this.tickets = newTicket
    }
}

export interface ShowDB {
    id: string,
    band: string,
    starts_at: Date,
}

export interface ShowInputDTO {
    token: string,
    band: string,
    date: string
}

export interface TicketInputDTO {
    token: string,
    showId: string
}

export interface TicketOutputDTO {
    message: string
}

export interface TicketDB {
    id: string,
    show_id: string,
    user_id: string
}