import Account from "../models/Accounts.js";
import Customer from "../models/Customers.js"
import { v4 as uuidv4 } from 'uuid';

class accountService {

    async CreateAccountForCustomer (_id, type, branch, number) {
        try {
            const customer = await Customer.findById(_id);

            if(!customer){
                throw new Error('Cliente não encontrado.');
            } else {
                 const createAccountForCustomer = new Account({
                _id : `acc_${uuidv4().slice(0, 3)}`,
                type,
                branch, 
                number
            })

            await createAccountForCustomer.save();
            customer.accounts.push(createAccountForCustomer._id);
            await customer.save();

            return createAccountForCustomer;
            }
           

        } catch(error){
            console.log(error)
        }
    }

    

     async getAll()
        {
            try {
                const accounts = await Account.find();
                return accounts;
            } catch (error) {
                console.log(error);
            }
        }
        

}

export default new accountService();