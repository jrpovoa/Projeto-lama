import { Router } from "express";
import { ShowBusiness } from "../business/ShowBusiness";
import { ShowController } from "../controller/ShowController";
import { ShowDatabase } from "../dataBase/ShowDatabase";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";


export const showRouter = Router()

const showController = new ShowController(new ShowBusiness(
   new ShowDatabase(),
   new Authenticator(),
   new IdGenerator()
))

showRouter.post("/create", showController.createShow)
showRouter.get('/allshows', showController.getAllShows)
showRouter.post('/ticket/:id', showController.buyTicket)
showRouter.delete('/ticket/delete/:id', showController.cancelTicket)
