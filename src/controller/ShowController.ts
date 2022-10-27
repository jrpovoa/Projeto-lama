import { Request, Response } from "express";
import { ShowBusiness } from "../business/ShowBusiness";
import { ShowInputDTO, TicketInputDTO } from "../types/Show";

export class ShowController {

    constructor(
        private showBusiness: ShowBusiness
    ) { }
    public createShow = async (req: Request, res: Response) => {

        try {
            const input: ShowInputDTO = {
                token: req.headers.authorization as string,
                band: req.body.band,
                date: req.body.date
            }

            // const showBusiness = new ShowBusiness()

            const response = await this.showBusiness.createShow(input)

            res.status(200).send(response)

        } catch (error: any) {

            res.status(error.statusCode || 500).send({ message: error.message })
        }
    }

    public getAllShows = async (req: Request, res: Response) => {
        try {

            // const showBusiness = new ShowBusiness()

            const response = await this.showBusiness.selectAllShows()

            res.status(200).send(response)

        } catch (error: any) {

            res.status(error.statusCode || 500).send({ message: error.message })

        }
    }

    public buyTicket = async (req: Request, res: Response) => {
        try {

            const input: TicketInputDTO = {
                token: req.headers.authorization as string,
                showId: req.params.id
            }

            // const showBusiness = new ShowBusiness()

            const response = await this.showBusiness.buyTicket(input)

            res.status(200).send(response)

        } catch (error: any) {

            res.status(error.statusCode || 500).send({ message: error.message })
        }
    }

    public cancelTicket = async (req: Request, res: Response) => {
        try {

            const input: TicketInputDTO = {
                token: req.headers.authorization as string,
                showId: req.params.id
            }

            // const showBusiness = new ShowBusiness()

            const response = await this.showBusiness.cancelTicket(input)

            res.status(200).send(response)

        } catch (error: any) {

            res.status(error.statusCode || 500).send({ message: error.message })
        }
    }
}