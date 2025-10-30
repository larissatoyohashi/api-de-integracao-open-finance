import ConsentService from "../services/ConsentService.js";
import { ObjectId } from "mongodb";

const getAllConsents = async (req,res) =>{
    try{
        const Consents = await ConsentService.getAll();
        res.status(200).json({Consents : Consents})
    } catch(error){
        res.status(500).json({error: 'Erro interno do Servidor'})
    }
}

const createConsent = async(req,res) => {
    try{
        const {consent, accountId} = req.body;
        const newConsent = await ConsentService.requestConsent(consent, accountId);

        res.status(201).json({Consent : newConsent})
    } catch(error){
        console.log(error);
        res.status(500).json({error: 'Erro interno do Servidor'})
    }
}
    const getConsentById = async(req,res) => {
      try {
        const { id } = req.params;
        const consent = await ConsentService.getOne(id);

        if (!consent) {
            return res.status(404).json({ message: 'Conta não encontrada' });
        }

        res.status(200).json(consent);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
}


const deleteConsent = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      await ConsentService.Delete(id);
      res.sendStatus(204);
    } else {
      res.status(400).json({ error: "A ID enviada é inválida." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};



export default {getAllConsents, createConsent, getConsentById, deleteConsent}