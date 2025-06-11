import {Router} from "express";
import {updateMerchant, deleteMerchant, 
    updateProfilePicture, getClients} from "../controllers/merchantController";
import { uploadFileMiddleware } from "../middlewares/uploadFileMiddleware";

const merchantRoute = Router();

merchantRoute.get('/clients', getClients)
merchantRoute.patch('/', updateMerchant);
merchantRoute.delete('/', deleteMerchant);

//rota para upload de imagem
merchantRoute.patch('/imageProfile', uploadFileMiddleware, updateProfilePicture);

export default merchantRoute;