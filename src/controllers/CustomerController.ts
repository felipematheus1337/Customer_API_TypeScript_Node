import { Request, Response } from "express";


class CustomerController {

    async index(req:Request,res:Response) {
     return res.json({
        Customer1: {
            name:"Felipe",
            address:"Rua 1"
        },
        Customer2: {
            name:"Mary",
            address:"Rua 2"
        }
     })
    }
}


export default new CustomerController();