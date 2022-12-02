import { NextFunction,Request,Response } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../exceptions/api-errors";
import { User } from "../models/User";
import { userRepository } from "../repositories/userRepository";

type JWTPayload  = {
   id:number;
}


export const authMiddleware = async (req:Request,res:Response,next:NextFunction) => {
 const {authorization} = req.headers;

 if(!authorization) {
    throw new UnauthorizedError("Não autorizado!");
 }

 const token = authorization.split(" ")[1]

 const {id} = jwt.verify(token,process.env.JWT_SECRET ?? '') as JWTPayload;

 const user = await userRepository.findOneBy({id});

 if(!user) {
    throw new UnauthorizedError("Não autorizado!");
 }

 const {password:_,...loggedUser} = user;

 req.user = loggedUser;

 next();


}
