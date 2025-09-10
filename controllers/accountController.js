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

const createAccount = async (req,res) => {
    try {
        const {_id, branch, number, balance} = req.body;
        await accountService.Create(_id, branch, number, balance)
        res.sendStatus(201)
    } catch (error){
        res.status(500).json({error: 'Erro interno do Servidor'});
    }
}

export default {getAllaccounts, createAccount};