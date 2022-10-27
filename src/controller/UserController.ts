import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { LoginInputDTO, UserInputDTO } from "../types/User";

export class UserController {

    constructor(
        private userBusiness: UserBusiness
    ) { }

    public createUser = async (req: Request, res: Response) => {

        try {

            const input: LoginInputDTO = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                role: req.body.role
            }

            // const userBusiness = new UserBusiness()



            const response = await this.userBusiness.createUser(input)
            res.status(200).send(response)

        } catch (error: any) {

            res.status(error.statusCode || 500).send({ message: error.message })

        }
    }

    public userLogin = async (req: Request, res: Response) => {

        try {
            const input: UserInputDTO = {
                email: req.body.email,
                password: req.body.password
            }

            // const userBusiness = new UserBusiness()

            const response = await this.userBusiness.loginUser(input)
            res.status(200).send(response)

        } catch (error: any) {
            res.status(error.statusCode || 500).send({ message: error.message })
        }
    }
}