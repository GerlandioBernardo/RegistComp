import {Router} from "express";
import {createClient, updateClient} from "../controllers/clientController";
import { authMiddleware } from "../middlewares/auth";
import { checkClientExists } from "../middlewares/checkClientExists";
import {deletePurchase, deleteItemPurchase, addPurchase} from "../controllers/purchaseController"

const clientRoute = Router();

// rota de cadastrar cliente
clientRoute.post('/', authMiddleware, createClient);
clientRoute.patch('/:clientId', checkClientExists, updateClient);


// rotas relacionadas as compras  do cliente
clientRoute.delete('/purchase/:clientId', deletePurchase);
clientRoute.post('/purchase/:clientId', checkClientExists, addPurchase);
clientRoute.delete('/:clientId/purchase/:itemPurchaseId', deleteItemPurchase);


export default clientRoute;