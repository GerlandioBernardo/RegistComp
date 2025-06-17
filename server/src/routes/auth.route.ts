import { Router  } from "express";
import {signup, login} from "../controllers/authController";
import {signupSchema, loginSchema} from "../schemas/authSchema";
import {validationMiddleware} from "../middlewares/validationMiddleware";

const authRoute = Router();

authRoute.post('/signup',validationMiddleware(signupSchema), signup);
authRoute.post('/login',validationMiddleware(loginSchema), login);

export default authRoute;