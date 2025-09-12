import permissionService from "../services/permissionService.js";

const getAllPermissions = async (req,res) =>{
    try{
        const permissions = await permissionService.getAll();
        res.status(200).json({permissions : permissions})
    } catch(error){
        res.status(500).json({error: 'Erro interno do Servidor'})
    }
}

const createPermission = async(req,res) => {
    try{
        const {consent, accountId} = req.body;
        const newPermission = await permissionService.requestPermission(consent, accountId);

        res.status(201).json({permission : newPermission})
    } catch(error){
        console.log(error);
        res.status(500).json({error: 'Erro interno do Servidor'})
    }
}

export default {getAllPermissions, createPermission}