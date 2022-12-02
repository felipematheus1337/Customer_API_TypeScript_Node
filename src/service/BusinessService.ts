import pdf from "html-pdf"
import { Customer } from "../models/Customer";
import { customerRepository } from "../repositories/customerRepository";




class BusinessService {

    async generateHTMLofCustomers() {
        let customers:Array<Customer> = await customerRepository.query(`SELECT name,phone,loyalty,address FROM customer`)
         const htmlContent:string = `
         <table>
         <tr>
          <th>Name</th>
          <th>Phone</th>
          <th>Loyalty</th>
          <th>Address</th>
         </tr>
          ${customers.map((c)=> {
            return (
               `<tr>
               <td>${c.name}</td>
                <td>${c.phone}</td>
                <td>${c.loyalty}</td>
                <td>${c.address}</td>
                </tr>`
                
            )
          })}
          <hr>
         </table>
         `
         return htmlContent.replace(/(\r\n|\n|\r)/gm, "").trim();
    }
}


export default new BusinessService();