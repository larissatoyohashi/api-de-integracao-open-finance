import express from "express";
const consentRoutes = express.Router();
import consentController from "../controllers/consentController.js";
import externalConsentController from "../controllers/externalConsentController.js";
import authMiddleware from "../middleware/Auth.js";
import adminAuth from "../middleware/AdminAuth.js";


consentRoutes.get("/consents",authMiddleware, consentController.getAllConsents);

consentRoutes.post("/consents",authMiddleware, consentController.createConsent);

consentRoutes.delete('/consents/:id_external_consent/customer/:id_customer', authMiddleware, externalConsentController.revokeExternalConsent);

consentRoutes.post('/external-consents', authMiddleware, externalConsentController.createExternalConsent);

export default consentRoutes;