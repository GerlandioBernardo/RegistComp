import {Router} from "express";
import {createClient} from "../controllers/customerController";
import { authMiddleware } from "../middlewares/auth";

const customerRoute = Router();

customerRoute.post('/', authMiddleware, createClient);

export default customerRoute;