import {Router} from "express"
import BusinessController from "../controllers/BusinessController";
import { authMiddleware } from "../middlewares/authMiddleware";

const businessRouter = Router();


businessRouter.use(authMiddleware);
businessRouter.get("/discount/:id",BusinessController.getCustomerDiscount);




export default businessRouter;