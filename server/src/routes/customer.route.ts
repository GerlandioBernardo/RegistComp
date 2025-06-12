import {Router} from "express";
import {createClient, deletePurchase} from "../controllers/clientController";
import { authMiddleware } from "../middlewares/auth";

const customerRoute = Router();

customerRoute.post('/', authMiddleware, createClient);
customerRoute.delete('/purchase', deletePurchase);

export default customerRoute;