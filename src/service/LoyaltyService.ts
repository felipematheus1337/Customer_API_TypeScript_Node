import { customerRepository } from "../repositories/customerRepository";


class LoyaltyService {


    getCustomerDiscountByLoyalty(loyalty: number):number {
        let totalDiscount;
        if(loyalty <= 0) {
            return 0;
        }

        switch (loyalty) {
            case (1) : {
                totalDiscount = (loyalty * 100) / 20;
                return totalDiscount;
                break;
            }
            case (2) : {
                totalDiscount = (loyalty * 100) / 20;
                return totalDiscount;
                break;
            }
            case (3) : {
                totalDiscount = (loyalty * 100) / 20;
                return totalDiscount;
                break;
            }
            case (4) : {
                totalDiscount = (loyalty * 100) / 20;
                return totalDiscount;
                break;
            }
            case (5) : {
                totalDiscount = (loyalty * 100) / 20;
                return totalDiscount;
                break;
            }
            case (6) : {
                totalDiscount = (loyalty * 100) / 20;
                return totalDiscount;
                break;
            }
            default : {
                totalDiscount = (loyalty * 100) / 15;
                return totalDiscount;
                break;
            }

            
        }
        

       

    }



}

export default new LoyaltyService();