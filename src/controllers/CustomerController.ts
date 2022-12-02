import { Request, Response } from "express";
import { EqualOperator } from "typeorm";
import { BadRequestError, NotFoundError } from "../exceptions/api-errors";
import { Customer } from "../models/Customer";
import { customerRepository } from "../repositories/customerRepository";
import  customerService  from "../service/CustomerService";

class CustomerController {

    async index(req:Request,res:Response) {
     const allCustomers = await customerRepository.find({});

     if(!allCustomers) {
        throw new NotFoundError("Customers não encontrados!");
     }
     return res.json(allCustomers);
    }

    async create(req:Request, res:Response) {
        const customer = req.body;

        if(!customer) {
            throw new BadRequestError("Campos devem ser preenchidos!")
        }

       const customertoAdd =  customerRepository.create(customer);

       await customerRepository.save(customertoAdd);


       return res.status(201).json(customertoAdd);
    }

    async getOneCustomerById(req:Request,res:Response) {

     if(!req.params) {
       throw new BadRequestError("É preciso ter um parâmetro de busca!")
     }

     const {id} = req.params;

     const customerFinded = await customerService.findById(id);
     
     if(!customerFinded) {
        throw new NotFoundError("Customer não encontrado");
     }

     return res.json(customerFinded);
     
    }

    async editCustomer(req:Request,res:Response) {
      if(!req.params) {
        throw new BadRequestError("É preciso ter um parâmetro de busca!")
      }
      const thingsToUpdateOnCustomer = req.body;

      if(!thingsToUpdateOnCustomer) {
        throw new BadRequestError("É preciso ter algo para se alterar!")
      }

      const {id} = req.params; 

      const customerToUpdate = await customerService.findById(id);

      if(!customerToUpdate) {
        throw new NotFoundError("Costumer não encontrado com esse id");
      }
    
    
      await customerRepository.update({id:Number(id)},
      thingsToUpdateOnCustomer);
     

      return res.json("Customer atualizado com sucesso!");
    }

    async deleteCustomer(req:Request,res:Response) {
        if(!req.params) {
            throw new BadRequestError("É preciso ter um parâmetro de busca!")
        }
        const {id} = req.params; 
    
        const customerToUpdate = await customerService.findById(id) as Customer;
    
        if(!customerToUpdate) {
            throw new NotFoundError("Costumer não encontrado com esse id");
          }
        
        
        await customerRepository.delete({id:Number(id)});
    
        return res.status(204);
    }
}


export default new CustomerController();