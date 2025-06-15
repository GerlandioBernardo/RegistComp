import {Router} from "express";
import { checkClientExists } from "../middlewares/checkClientExists";
import { validationMiddleware } from "../middlewares/validationMiddleware";
import { deleteItemPurchase, deletePurchase, addPurchase } from "../controllers/purchaseController";
import { compraSchema } from "../schemas/purchaseSchema";

const purchaseRoute = Router();

purchaseRoute.delete('/', deletePurchase);
purchaseRoute.post('/', checkClientExists, validationMiddleware(compraSchema), addPurchase);
purchaseRoute.delete('/:itemPurchaseId', deleteItemPurchase);

export default purchaseRoute;