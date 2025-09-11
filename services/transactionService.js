import Transaction from "../models/Transactions.js"
import Account from "../models/Accounts.js"
import { v4 as uuidv4 } from 'uuid';

class transactionService{

   async newTransaction (_id, date, description, amount, type, category) {
        try {
            const account = await Account.findById(_id);

            if(!account){
               console.log('Conta não encontrada.');
            }
            
            const normalizedType = type.toLowerCase();
            
            if (normalizedType === 'credit') {
                if(account.balance < amount){
                    console.log('Saldo insuficiente para realizar a operação.');
                }

                account.balance -= amount;
            } else if (normalizedType ==='debit'){
                    account.balance += amount;
                } else {
                    console.log('Transação inválida');
                }

            const newTransaction = new Transaction({
                _id: `txn_${uuidv4().slice(0, 3)}`,
                date,
                description,
                amount,
                type,
                category
            });

            await newTransaction.save();
            account.transactions.push(newTransaction._id);
            await account.save();

            return newTransaction;
            
        } catch(error){
            console.log(error)
        }
    }

     async getAll()
        {
            try {
                const transaction = await Transaction.find();
                return transaction;
            } catch (error) {
                console.log(error);
            }
        }


}


export default new transactionService();