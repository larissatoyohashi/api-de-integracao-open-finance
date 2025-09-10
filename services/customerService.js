import Customer from "../models/Customers.js"
import { v4 as uuidv4 } from 'uuid';

class customerService {

    async Create( _id, name, cpf , email ){

            try {
                const newCustomer = new Customer ({
                    _id : `cus_${uuidv4().slice(0, 3)}`,
                    name,
                    cpf,
                    email
                });
                await newCustomer.save()
            }catch (error){
                console.log(error);
            }
    }

    async getAll(){

        try {
            const customers = await Customer.find();
            return customers;
        } catch (error){
            console.log(error);
        }
    }
}

export default new customerService();