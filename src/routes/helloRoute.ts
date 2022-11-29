import { Router } from "express";
import helloController from "../controllers/HelloController";

const routes = Router();


routes.get("/",helloController.greeting);


export default routes;