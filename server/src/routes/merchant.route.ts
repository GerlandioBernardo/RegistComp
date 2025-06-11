import {Router} from "express";
import {updateMerchant} from "../controllers/merchantController";

const merchantRoute = Router();

merchantRoute.patch('/', updateMerchant);

export default merchantRoute;