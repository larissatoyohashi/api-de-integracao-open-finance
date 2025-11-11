import ExternalConsentService from "../services/externalConsentService.js";

const revokeExternalConsent = async (req, res, next) => {
    try {
        const { id_external_consent, id_customer } = req.params;
        const result = await ExternalConsentService.delete(id_external_consent, id_customer);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }  
};

const createExternalConsent = async (req, res, next) => {
    try {
        const { customer } = req.body;
        if (!customer) return res.status(400).json({ message: 'Campo "customer" é obrigatório.' });

        const result = await ExternalConsentService.createAndGenerateKey({ customer });
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};

export default {
    revokeExternalConsent,
    createExternalConsent
};