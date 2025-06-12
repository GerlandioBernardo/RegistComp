import {Router} from "express";
import {createClient, deletePurchase, addPurchase} from "../controllers/clientController";
import { authMiddleware } from "../middlewares/auth";

const customerRoute = Router();

customerRoute.post('/', authMiddleware, createClient);
customerRoute.delete('/purchase', deletePurchase);
customerRoute.post('/purchase', addPurchase);

export default customerRoute;