import Transaction from "../models/Transactions.js"
import { v4 as uuidv4 } from 'uuid';

class transactionService{

    async Create(_id, date, description, amount, type, category){
        try{
            const newTransaction = new Transaction ({
                _id : `txn_${uuidv4().slice(0,3)}`,
                date,
                description,
                amount,
                type, 
                category
            });
            
            await newTransaction.save()
        } catch(error){
            console.log(error);
        }
    }


}


export default new customerService();