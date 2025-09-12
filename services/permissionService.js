import Permission from "../models/Permissions.js";
import Account from "../models/Accounts";

class permissionService{

    async requestPermission(consent, accountId){
        try{
            const account = await Account.findOne({_id : accountId});

            if(!account) {
                console.log('Conta não encontrada');
            }

            if (consent === 'true'){
            const posPermission = new Permission({
                accountId: accountId,
                consent : true
            })

            await posPermission.save();
            return {permission : posPermission, message:'Compartilhamento de dados autorizado.'};
            
            } else if (consent === 'false') {

                const falPermission = new Permission ({
                
                accountId: accountId,
                consent : false
                })

            await falPermission.save();
            return {permission : falPermission, message:'Compartilhamento de dados não autorizado.'};
            } else {

                console.log("Valor inválido")

            }

        }catch(error){
            console.log(error)
        }
    }


    async updatePermission(id, consent){

        try{
            await Permission.findByIdAndUpdate(id,{
                consent
            });
            console.log(`Permissão alterada com sucesso`);
            return updatedPermission;

         } catch(error) {
            console.log(error)
         }
    }


    async getAll(){
        try{
            const permissions = await Permission.find();
            return permissions;
        } catch(error){
            console.log(error);
        }
    }

}

export default new permissionService();