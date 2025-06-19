import {Router} from "express";
import {updateMerchant, deleteMerchant, 
    updateProfilePicture, getClients} from "../controllers/merchantController";
import { uploadFileMiddleware } from "../middlewares/uploadFileMiddleware";
import { authMiddleware } from "../middlewares/auth";

const merchantRoute = Router();

merchantRoute.get('/clients', authMiddleware, getClients)
merchantRoute.patch('/', authMiddleware, updateMerchant);
merchantRoute.delete('/', authMiddleware, deleteMerchant);

//rota para upload de imagem
merchantRoute.patch('/imageProfile',uploadFileMiddleware, authMiddleware,  updateProfilePicture);

export default merchantRoute;