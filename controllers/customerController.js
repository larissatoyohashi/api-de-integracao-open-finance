import customerService from "../services/customerService.js";
import accountService from "../services/accountService.js";

const getAllcustomers = async(req,res) => {
    try{
const customers = await customerService.getAll()
res.status(200).json({customers : customers});
} catch(error) {
    console.log(error);
    res.status(500).json({error: 'Erro interno do Servidor'});
}
}

const createCustomer = async (req,res) => {
    try {
        const {_id, name, cpf, email} = req.body;
        await customerService.Create(_id, name, cpf, email)
        res.sendStatus(201)
    } catch (error){
        res.status(500).json({error: 'Erro interno do Servidor'});
    }
}

const addAccountToCustomer = async (req,res) => {
    try {
        if(Object.isValid(req.params._id)){
            const id = req.params.id
            const{account} = req.body

            const customer = await customerService.UpdateAcc(account)
            res.sendStatus(200).json({customer})
        } else {
            res.sendStatus(400).json({error : "Bad Request"})
        } 
    } catch(error){
            res.status(500).json({error : "Erro interno do servidor"})
        }
}

export default {getAllcustomers, createCustomer};