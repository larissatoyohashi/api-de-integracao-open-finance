import Account from "../models/Accounts.js";

class accountService {

    async Create (type, branch, number) {
        try {

            const newAccount = new Account({

                 _id : `acc_${uuidv4().slice(0, 3)}`,
                type,
                branch, 
                number
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