import ExternalConsent from "../models/ExternalConsent.js";
import Customer from "../models/Customers.js";
import { NotFoundError, BadRequestError, ForbiddenError } from "../exceptions/api-errors.exception.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";


class ExternalConsentService {
    async createAndGenerateKey(consentData) {
        try{
        const { customer } = consentData;
        
        const owner = await Customer.findById(customer);
        if (!owner) {
            throw new NotFoundError('Cliente (proprietário do consentimento) não encontrado');
        }

        const plainApiKey = crypto.randomBytes(32).toString("hex");
        const salt = await bcrypt.genSalt(10);
        const apiKeyHash = await bcrypt.hash(plainApiKey, salt);

        const created = await ExternalConsent.create({
           customer: customer,
           apiKey: apiKeyHash,
           status: 'AUTHORIZED'
        });

        return {
            plainApiKey: plainApiKey,
            userIdInChildApi: customer,
            consentId: created._id
        };
    } catch (error) {
        throw new BadRequestError('Erro ao criar consentimento externo: ' + error.message);
    }
}

    async delete(consentId, customerId) {
        try{
        const externalConsent = await ExternalConsent.findOne({ _id: consentId, customer: customerId });
        if (!externalConsent) {
            throw new NotFoundError('Consentimento externo não encontrado');
        }
        await externalConsent.remove();
        return { message: 'Consentimento externo removido com sucesso' };
    } catch (error) {
        throw new BadRequestError('Erro ao deletar consentimento externo: ' + error.message);
    }
    }

}

export default new ExternalConsentService();