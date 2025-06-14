import {Router} from "express"
import authRoute from "./auth.route"
import merchantRoute from "./merchant.route";
import clientRoute from "./client.route";

const rootRoute = Router();

rootRoute.use('/auth', authRoute);
rootRoute.use('/merchant', merchantRoute);
rootRoute.use('/customer', clientRoute);

export default rootRoute;