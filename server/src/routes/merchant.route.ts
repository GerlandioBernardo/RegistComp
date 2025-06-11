import {Router} from "express";
import {updateMerchant, deleteMerchant, 
    updateProfilePicture} from "../controllers/merchantController";
import { uploadFileMiddleware } from "../middlewares/uploadFileMiddleware";

const merchantRoute = Router();

merchantRoute.patch('/', updateMerchant);
merchantRoute.delete('/', deleteMerchant);

//rota para upload de imagem
merchantRoute.patch('/imageProfile', uploadFileMiddleware, updateProfilePicture);

export default merchantRoute;