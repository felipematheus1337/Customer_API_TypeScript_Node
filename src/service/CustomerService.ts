import { customerRepository } from "../repositories/customerRepository";



class CustomerService {


    async findById(id:number | string){ 
       if(typeof(id) === 'string') {
        id = Number(id);
       }

     const customer = await customerRepository.findOneBy({id});
     if(customer) {
        return customer;
     } else {
        return null
     }

    }



}

export default new CustomerService();