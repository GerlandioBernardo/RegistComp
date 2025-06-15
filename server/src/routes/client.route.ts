import {Router} from "express";
import {createClient, updateClient} from "../controllers/clientController";
import { authMiddleware } from "../middlewares/auth";
import { checkClientExists } from "../middlewares/checkClientExists";
import {clienteSchema} from "../schemas/clientSchema";
import { validationMiddleware } from "../middlewares/validationMiddleware";
import purchaseRoute from "./purchase.route";

const clientRoute = Router();

// rota de cadastrar cliente
clientRoute.post('/', authMiddleware, validationMiddleware(clienteSchema), createClient);
clientRoute.patch('/:clientId', checkClientExists, updateClient);


// rotas relacionadas as compras  do cliente
clientRoute.use('/:clientId/purchase', purchaseRoute);


export default clientRoute;