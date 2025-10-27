import accountService from "../services/accountService.js";

const getAllaccounts = async(req,res) => {
    try{
const accounts = await accountService.getAll()
res.status(200).json({accounts : accounts});
} catch(error) {
    console.log(error);
    res.status(500).json({error: 'Erro interno do Servidor'});
}
}

const getBalanceFromAccount = async(req,res) => {
      try {
        const { id } = req.params;
        const account = await accountService.getOne(id);

        if (!account) {
            return res.status(404).json({ message: 'Conta não encontrada' });
        }

        res.status(200).json(account);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
}

const getTransactionsFromAccount = async(req,res) => {
      try {
        const { id } = req.params;
        const account = await accountService.getTransactions(id);

        if (!account) {
            return res.status(404).json({ message: 'Conta não encontrada' });
        }

        res.status(200).json(account);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
}


const createAccount = async (req,res) => {
    try {  
        const { customerId, type, branch, number, balance } = req.body;
        const newAccount = await accountService.createAccountForCustomer(customerId, type, branch, number, balance);

        if (newAccount instanceof Error) {
            return res.status(404).json({ message: newAccount.message });
        }

        res.status(201).json({ account: newAccount });

    } catch (error){
        res.status(500).json({error: 'Erro interno do Servidor'});
    }
}

export default {getAllaccounts, createAccount, getBalanceFromAccount, getTransactionsFromAccount};