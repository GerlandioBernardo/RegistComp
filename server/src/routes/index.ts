import {Router} from "express"
import authRoute from "./auth.route"
import merchantRoute from "./merchant.route";
import customerRoute from "./customer.route";

const rootRoute = Router();

rootRoute.use('/auth', authRoute);
rootRoute.use('/merchant', merchantRoute);
rootRoute.use('/customer', customerRoute);

export default rootRoute;