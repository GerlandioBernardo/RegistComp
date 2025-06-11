import { Router  } from "express";
import {signup} from "../controllers/authController";

const authRoute: Router = Router();

authRoute.post('/sigunp', signup);

export default authRoute;