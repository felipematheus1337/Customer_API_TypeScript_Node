import { Router } from "express";
import customerController from "../controllers/CustomerController";


const customerRouter = Router();

customerRouter.get("/",customerController.index);
customerRouter.post("/",customerController.create);
customerRouter.get("/:id",customerController.getOneCustomerById);
customerRouter.put("/:id",customerController.editCustomer);
customerRouter.delete("/:id",customerController.deleteCustomer);


export default customerRouter;