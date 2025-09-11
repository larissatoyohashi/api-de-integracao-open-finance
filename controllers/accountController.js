import accountService from "../services/accountService.js";
import customerService from "../services/customerService.js";

const getAllaccounts = async(req,res) => {
    try{
const accounts = await accountService.getAll()
res.status(200).json({accounts : accounts});
} catch(error) {
    console.log(error);
    res.status(500).json({error: 'Erro interno do Servidor'});
}
}


const createAccount = async (req,res) => {
    try {
        
        const { _id, type, branch, number, balance } = req.body;
        const newAccount = await accountService.CreateAccountForCustomer(_id, type, branch, number, balance);
        res.status(201).json({ account: newAccount });

    } catch (error){
        res.status(500).json({error: 'Erro interno do Servidor'});
    }
}

export default {getAllaccounts, createAccount};