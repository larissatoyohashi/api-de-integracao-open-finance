import Account from "../models/Accounts.js";
import Customer from "../models/Customers.js"
import { v4 as uuidv4 } from 'uuid';


class accountService {

    async Create (type, branch, number, balance) {
        try {

            const newAccount = new Account({

                 _id : `acc_${uuidv4().slice(0, 3)}`,
                type,
                branch, 
                number,
                balance
            })

            await newAccount.save();

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