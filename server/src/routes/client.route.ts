import {Router} from "express";
import {createClient, updateClient} from "../controllers/clientController";
import { authMiddleware } from "../middlewares/auth";
import { checkClientExists } from "../middlewares/checkClientExists";
import {deletePurchase, deleteItemPurchase, addPurchase} from "../controllers/purchaseController"
import {clienteSchema} from "../schemas/clientSchema";
import { validationMiddleware } from "../middlewares/validationMiddleware";
import {compraSchema} from "../schemas/purchaseSchema";

const clientRoute = Router();

// rota de cadastrar cliente
clientRoute.post('/', authMiddleware, validationMiddleware(clienteSchema), createClient);
clientRoute.patch('/:clientId', checkClientExists, updateClient);


// rotas relacionadas as compras  do cliente
clientRoute.delete('/purchase/:clientId', deletePurchase);
clientRoute.post('/purchase/:clientId', checkClientExists, validationMiddleware(compraSchema), addPurchase);
clientRoute.delete('/:clientId/purchase/:itemPurchaseId', deleteItemPurchase);


export default clientRoute;