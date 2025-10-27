import transactionService from "../services/transactionService.js"


const getAllTransactions = async (req, res) => {
    try {
    const transactions = await transactionService.getAll();
    res.status(200).json({transactions : transactions})
}catch(error){
    console.log(error);
    res.status(500).json({error: 'Erro interno do Servidor'})
}
}

const createTransaction = async (req,res) => {
        try {
            const{accountId, date, description, amount, type, category}= req.body;

            const newTransaction = await transactionService.newTransaction(accountId, date, description,amount, type, category);

            res.status(201).json({transaction : newTransaction});

        }catch(error){
            console.log(error);
            res.status(500).json({error : 'Erro interno do Servidor'});
        }

}

const getAllTransactionsFromAccount = async (req, res) => {
    try {
        const { id } = req.params; 
        const transactions = await transactionService.getTransactionsByAccountId(id);
        res.status(200).json({ transactions }); 

    } catch (error) {
        if (error.message.includes('Conta não encontrada')) {
            return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: 'Erro interno do servidor', error: error.message });
    }
};

export default {getAllTransactions, createTransaction, getAllTransactionsFromAccount}