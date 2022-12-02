import { Router } from "express";
import userController from "../controllers/UserController";
import { authMiddleware } from "../middlewares/authMiddleware";

const userRouter = Router();

userRouter.post("/",userController.create);
userRouter.post("/login",userController.login);
userRouter.use(authMiddleware);

userRouter.get("/",userController.index);
userRouter.get("/:id",userController.getOneUserById);
userRouter.put("/:id",userController.editUser);
userRouter.delete("/:id",userController.deleteUser);


export default userRouter;