import {Router} from "express";
import {updateMerchant, deleteMerchant, 
    updateProfilePicture, getClients} from "../controllers/merchantController";
import { uploadFileMiddleware } from "../middlewares/uploadFileMiddleware";
import { authMiddleware } from "../middlewares/auth";
import {checkMerchantExists} from "../middlewares/checkMerchantExists";

const merchantRoute = Router();

merchantRoute.get('/clients', authMiddleware, checkMerchantExists, getClients);
merchantRoute.patch('/', authMiddleware, checkMerchantExists, updateMerchant);
merchantRoute.delete('/', authMiddleware, checkMerchantExists, deleteMerchant);

//rota para upload de imagem
merchantRoute.patch('/imageProfile',uploadFileMiddleware, authMiddleware,  updateProfilePicture);

export default merchantRoute;