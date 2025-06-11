import { Router  } from "express";
import {signup, login} from "../controllers/authController";

const authRoute: Router = Router();

authRoute.post('/sigunp', signup);
authRoute.post('/login', login);

export default authRoute;