import Consent from "../models/Consents.js";
import Account from "../models/Accounts.js";

class consentService{

    async requestConsent(consent, accountId){
        try{
            const account = await Account.findOne({_id : accountId});

            if(!account) {
                throw new Error('Conta não encontrada.');
            } else {

            if (consent === 'true'){
            const posConsent = new Consent({
                accountId: accountId,
                consent : true
            })

            await posConsent.save();
            return {Consent : posConsent, message:'Compartilhamento de dados autorizado.'};
            
            } else if (consent === 'false') {

                const falConsent = new Consent ({
                
                accountId: accountId,
                consent : false
                })

            await falConsent.save();
            return {Consent : falConsent, message:'Compartilhamento de dados não autorizado.'};
            } else {
                throw new Error('Valor Inválido.');
            }
        }

        }catch(error){
            console.log(error)
        }
    }


    async updateConsent(id, consent){

        try{
            await Consent.findByIdAndUpdate(id,{
                consent
            });
            console.log(`Permissão alterada com sucesso`);
            return updatedConsent;

         } catch(error) {
            console.log(error)
         }
    }


    async getAll(){
        try{
            const consents = await Consent.find();
            return consents;
        } catch(error){
            console.log(error);
        }
    }

    async getOne(_id){
        try{
           const consent = await Consent.findById(_id);
            return consent;

        } catch(error){
            console.log(error);
        }
    }

    async Delete(_id) {
        try {
        await Consent.findByIdAndDelete(_id);
        console.log(`Consentimento com a id ${_id} deletado com sucesso.`);
        } catch (error) {
        console.log(error);
        }
    }

}

export default new consentService();
