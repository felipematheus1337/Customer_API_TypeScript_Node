import {Request,Response,NextFunction} from "express";
import { BadRequestError } from "../exceptions/api-errors";
import { Customer } from "../models/Customer";
import customerService from "../service/CustomerService";
import loyaltyService from "../service/LoyaltyService";




class BusinessController {

    async getCustomerDiscount(req:Request,res:Response) {
     const {id} = req.params;

     if(!id) {
        throw new BadRequestError("É necessário ID!")
     }

     const customer = await customerService.findById(id);

     if(!customer) {
      throw new BadRequestError("Customer Invalido!")
     }

     const discount = loyaltyService.getCustomerDiscountByLoyalty(customer.loyalty);

     if(discount <= 0) {
        return res.json({message:`Customer ${customer.name} não está válido para descontos`});
     }

     return res.json({message:`Desconto de ${discount}% autorizado para o customer: ${customer.name}`});
    }


   async getPDFofCustomers()  {
      
   }

}



export default new BusinessController();