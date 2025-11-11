import ExternalConsent from "../models/ExternalConsent.js";
import bcrypt from "bcryptjs";

export default async function apiKeyAuth(req, res, next) {
  try {
    const header = req.headers['authorization'] || req.headers['Authorization'];
    let token = null;
    if (header && typeof header === 'string' && header.startsWith('ApiKey ')) {
      token = header.slice('ApiKey '.length).trim();
    } else if (req.headers['x-api-key']) {
      token = req.headers['x-api-key'];
    }

    if (!token) {
      return res.status(401).json({ message: 'Chave de API é obrigatória' });
    }

    const parts = token.split(':');
    if (parts.length !== 2) {
      return res.status(400).json({ message: 'Formato da chave de API inválido' });
    }

    const [consentId, plainSecret] = parts;
    const consent = await ExternalConsent.findById(consentId).select('+apiKey');
    if (!consent) {
      return res.status(401).json({ message: 'Chave de API inválida' });
    }

    if (consent.status !== 'AUTHORIZED') {
      return res.status(403).json({ message: 'Consentimento não autorizado' });
    }

    const match = await bcrypt.compare(plainSecret, consent.apiKey);
    if (!match) {
      return res.status(401).json({ message: 'Chave de API inválida' });
    }
    req.externalConsent = { consentId: consent._id.toString(), customerId: consent.customer };
    next();
  } catch (err) {
    next(err);
  }
}
