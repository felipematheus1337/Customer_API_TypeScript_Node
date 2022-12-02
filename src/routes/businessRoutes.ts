import {Router} from "express"
import BusinessController from "../controllers/BusinessController";
import { authMiddleware } from "../middlewares/authMiddleware";

const businessRouter = Router();



businessRouter.get("/discount/:id",BusinessController.getCustomerDiscount);
businessRouter.get("/pdf/",BusinessController.getPDFofCustomers);




export default businessRouter;