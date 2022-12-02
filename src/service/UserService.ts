import { userRepository } from "../repositories/userRepository";



class UserService {


    async findById(id:number | string){ 
       if(typeof(id) === 'string') {
        id = Number(id);
       }

     const user = await userRepository.findOneBy({id});
     if(user) {
        return user;
     } else {
        return null
     }

    }



}

export default new UserService();