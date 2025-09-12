import Customer from "../models/Customers.js"
import { randomInt } from 'node:crypto';


class customerService {

    async Create( _id, name, cpf , email ){

            try {

            let newCustomerId;
            let idExists = true;

            while (idExists) {
                const randomNumber = randomInt(0, 999).toString().padStart(3, '0');
                newCustomerId = `cus_${randomNumber}`;
                const existingCustomer = await Customer.findById(newCustomerId);

                if (!existingCustomer) {
                    idExists = false;
                }

            }

                const newCustomer = new Customer ({
                    _id : newCustomerId,
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