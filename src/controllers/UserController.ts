import { Request, Response } from "express";
import { BadRequestError, NotFoundError, UnauthorizedError } from "../exceptions/api-errors";
import { userRepository } from "../repositories/userRepository";
import bcrypt from "bcrypt";
import userService from "../service/UserService";
import { User } from "../models/User";
import jwt from "jsonwebtoken";


class UserController {

    async index(req:Request,res:Response) {
     const allusers = await userRepository.find({});

     if(!allusers) {
        throw new NotFoundError("users não encontrados!");
     }
     return res.json(allusers);
    }

    async create(req:Request, res:Response) {

        const {password,name,email} = req.body;

        const hashPassword:string = await bcrypt.hash(password,8);


       const usertoAdd =  userRepository.create({
        password:hashPassword,
        name,
        email
       });

       await userRepository.save(usertoAdd);
       return res.status(201).json(usertoAdd);
    }

    async getOneUserById(req:Request,res:Response) {

     if(!req.params) {
       throw new BadRequestError("É preciso ter um parâmetro de busca!")
     }

     const {id} = req.params;

     const userFinded = await userService.findById(id);
     
     if(!userFinded) {
        throw new NotFoundError("User não encontrado");
     }

     return res.json(userFinded);
     
    }

    async editUser(req:Request,res:Response) {
      if(!req.params) {
        throw new BadRequestError("É preciso ter um parâmetro de busca!")
      }
      const thingsToUpdateOnUser = req.body;

      if(!thingsToUpdateOnUser) {
        throw new BadRequestError("É preciso ter algo para se alterar!")
      }

      const {id} = req.params; 

      const userToUpdate = await userService.findById(id) as User;

      if(!userToUpdate) {
        throw new NotFoundError("User não encontrado com esse id");
      }
    
    
      await userRepository.update({id:Number(id)},thingsToUpdateOnUser);
     

      return res.json("User atualizado com sucesso!");
    }

    async deleteUser(req:Request,res:Response) {
        if(!req.params) {
            throw new BadRequestError("É preciso ter um parâmetro de busca!")
        }
        const {id} = req.params; 
    
        const userToDelete = await userService.findById(id) as User;
    
        if(!userToDelete) {
            throw new NotFoundError("User não encontrado com esse id");
          }
        
        
        await userRepository.delete({id:Number(id)});
    
        return res.status(204);
    }


    async login (req:Request,res:Response) {
      const {email,password} = req.body;


      const user = await userRepository.findOneBy({email});

      if(!user) {
        throw new BadRequestError("Email ou senha invalidos!")
      }

      const isValidUser = await bcrypt.compare(password,user.password);

      if(!isValidUser) {
        throw new BadRequestError("Email ou senha invalidos!");
      }

      const token = jwt.sign({id:user.id},process.env.JWT_SECRET || '',{expiresIn:'5d'});

      const {password:_,...userLogin} = user;

      return res.status(200).json({
        user:userLogin,
        token
      })

    }

    async getProfile(req:Request,res:Response) {
      return res.json(req.user);
      


  }
}


export default new UserController();