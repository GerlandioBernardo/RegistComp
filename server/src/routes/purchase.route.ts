import {Router} from "express";
import { checkClientExists } from "../middlewares/checkClientExists";
import { validationMiddleware } from "../middlewares/validationMiddleware";
import { deleteItemPurchase, deletePurchase, addPurchase } from "../controllers/purchaseController";
import { compraSchema } from "../schemas/purchaseSchema";

const purchaseRoute = Router({mergeParams: true});

purchaseRoute.delete('/', deletePurchase);
purchaseRoute.post('/:purchaseId', checkClientExists, validationMiddleware(compraSchema), addPurchase);
purchaseRoute.delete('/item/:itemPurchaseId', deleteItemPurchase);

export default purchaseRoute;