import mongoose from "mongoose";
import Transaction from "../models/Transactions.js"
import Account from "../models/Accounts.js"
import Decimal from 'decimal.js';
import { randomInt } from 'node:crypto';



class transactionService{

   async newTransaction (_id, date, description, amount, type, category) {
        try {
            const account = await Account.findById(_id);

            if (!account) {
                throw new Error('Conta não encontrada.');
            }
            const currentBalance = new Decimal(account.balance.toString());
            const transactionAmount = new Decimal(amount.toString());
            
            let newBalance; 

            const normalizedType = type.toLowerCase();
            
            if (normalizedType === 'credit') { 
                if (currentBalance.lessThan(transactionAmount)) {
                    throw new Error('Saldo insuficiente para realizar a operação.');
                }
                newBalance = currentBalance.sub(transactionAmount); 
            } else if (normalizedType === 'debit') {
                newBalance = currentBalance.add(transactionAmount); 
            } else {
                throw new Error('Tipo de transação inválido');
            }

            account.balance = mongoose.Types.Decimal128.fromString(newBalance.toFixed(2));

            let newTransactionId;
            let idExists = true;

            while (idExists) {
                const randomNumber = randomInt(0, 999).toString().padStart(3, '0');
                newTransactionId = `txn_${randomNumber}`;
                const existingTransaction = await Transaction.findById(newTransactionId);

                if (!existingTransaction) {
                    idExists = false;
                }

            }

            const newTransaction = new Transaction({
                _id: newTransactionId,
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