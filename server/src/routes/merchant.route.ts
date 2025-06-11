import {Router} from "express";
import {updateMerchant, deleteMerchant} from "../controllers/merchantController";

const merchantRoute = Router();

merchantRoute.patch('/', updateMerchant);
merchantRoute.delete('/', deleteMerchant);

export default merchantRoute;