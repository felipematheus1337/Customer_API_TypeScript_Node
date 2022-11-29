import { Router } from "express";
import customerController from "../controllers/CustomerController";


const customerRouter = Router();

customerRouter.get("/",customerController.index);


export default customerRouter;