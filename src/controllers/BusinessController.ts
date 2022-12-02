import { pbkdf2 } from "crypto";
import {Request,Response,NextFunction} from "express";
import { BadRequestError } from "../exceptions/api-errors";
import { Customer } from "../models/Customer";
import BusinessService from "../service/BusinessService";
import customerService from "../service/CustomerService";
import loyaltyService from "../service/LoyaltyService";
import pdf from "html-pdf"




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


   async getPDFofCustomers(req:Request,res:Response)  {
      
      res.setHeader('Content-Length',999999)
      res.setHeader('Content-Type', 'application/pdf');

      var ARCHIVE_NAME = 'listOfCustomers'
      var FILE_PATH = "./uploads/"
      var fullPath = `${FILE_PATH}${ARCHIVE_NAME}_${Date.now()}.pdf`

      let  customersHTML = await BusinessService.generateHTMLofCustomers();

      pdf.create(customersHTML,{}).toFile(fullPath,(error,response) => {

        if(error) {
         console.log(error);
         return res.status(406).json({error:error});
        }

        return res.download(fullPath,(err) => {

         if(err) {
           console.log(err);
           return res.status(406).json({error:`Error no download ${err}`})
         } else {
            res.end();
         }
        })

      })


     
     
   }

}



export default new BusinessController();