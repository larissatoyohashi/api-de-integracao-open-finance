import Account from "../models/Accounts.js";
import Customer from "../models/Customers.js"
import { randomInt } from 'node:crypto';


class accountService {

    async createAccountForCustomer (_id, type, branch, number) {
        try {

            let newAccountId;
            let idExists = true;
            
            while (idExists) {
                const randomNumber = randomInt(0, 999).toString().padStart(3, '0');
                newAccountId = `acc_${randomNumber}`;
                const existingAccount = await Account.findById(newAccountId);

                if (!existingAccount) {
                    idExists = false;
                }

            }
                        
            const customer = await Customer.findById(_id);

            if(!customer){
                throw new Error('Cliente não encontrado.');
            } else {
                 const createAccountForCustomer = new Account({
                _id : newAccountId,
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

    async getOne(_id){
        try{
           const account = await Account.findById(_id).select('balance');
        return account;

        } catch(error){
            console.log(error);
        }
    }

     async getTransactions(_id){
        try{
           const account = await Account.findById(_id).populate('transactions');
        return account.transactions;

        } catch(error){
            console.log(error);
        }
    }
        

}

export default new accountService();
