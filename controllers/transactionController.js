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
            const{_id, date, description, amount, type, category}= req.body;

            const newTransaction = await transactionService.newTransaction(_id, date, description,amount, type, category);

            res.status(201).json({transaction : newTransaction});

        }catch(error){
            console.log(error);
            res.status(500).json({error : 'Erro interno do Servidor'});
        }

}

export default {getAllTransactions, createTransaction}