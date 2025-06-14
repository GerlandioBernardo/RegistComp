import {Router} from "express";
import {createClient, deletePurchase, addPurchase} from "../controllers/clientController";
import { authMiddleware } from "../middlewares/auth";

const clientRoute = Router();

// rota de cadastrar cliente
clientRoute.post('/', authMiddleware, createClient);

// rotas para compras  do cliente
clientRoute.delete('/purchase/:clientId', deletePurchase);
clientRoute.post('/purchase', addPurchase);
clientRoute.delete('/:clientId/purchase/:itemPurchaseId');


export default clientRoute;