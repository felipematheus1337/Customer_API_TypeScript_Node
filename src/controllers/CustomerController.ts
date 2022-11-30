import { Request, Response } from "express";
import { EqualOperator } from "typeorm";
import { Customer } from "../models/Customer";
import { customerRepository } from "../repositories/customerRepository";
import  customerService  from "../service/CustomerService";

class CustomerController {

    async index(req:Request,res:Response) {
     const allCustomers = await customerRepository.find({});

     if(!allCustomers) {
        return res.status(204).json("Nenhum Costumer encontrado");
     }
     return res.json(allCustomers);
    }

    async create(req:Request, res:Response) {
        const customer = req.body;

        if(!customer) {
            throw new Error("Campos devem ser preenchidos!")
        }

       const customertoAdd =  customerRepository.create(customer);

       await customerRepository.save(customertoAdd);


       return res.status(201).json(customertoAdd);
    }

    async getOneCustomerById(req:Request,res:Response) {

     if(!req.params) {
       throw new Error("É preciso ter um parâmetro de busca!")
     }

     const {id} = req.params;

     const customerFinded = await customerService.findById(id);
     
     if(!customerFinded) {
        throw new Error("Customer não encontrado");
     }

     return res.json(customerFinded);
     
    }

    async editCustomer(req:Request,res:Response) {
      if(!req.params) {
        throw new Error("É preciso ter um parâmetro de busca!")
      }
      const thingsToUpdateOnCustomer = req.body;

      if(!thingsToUpdateOnCustomer) {
        throw new Error("É preciso ter algo para se alterar!")
      }

      const {id} = req.params; 

      const customerToUpdate = await customerService.findById(id) as Customer;

      if(!customerToUpdate) {
        throw new Error("Costumer não encontrado com esse id");
      }
    
    
      await customerRepository.update({id:Number(id)},
      thingsToUpdateOnCustomer);
     

      return res.json("Customer atualizado com sucesso!");
    }

    async deleteCustomer(req:Request,res:Response) {
        if(!req.params) {
            throw new Error("É preciso ter um parâmetro de busca!")
          }
        const {id} = req.params; 
    
        const customerToUpdate = await customerService.findById(id) as Customer;
    
        if(!customerToUpdate) {
            throw new Error("Costumer não encontrado com esse id");
          }
        
        
        await customerRepository.delete({id:Number(id)});
    
        return res.status(204);
    }
}


export default new CustomerController();