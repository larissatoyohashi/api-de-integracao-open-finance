import express from "express";
const consentRoutes = express.Router();
import consentController from "../controllers/consentController.js";
import authMiddleware from "../middleware/Auth.js"; 


consentRoutes.get("/consents",authMiddleware, consentController.getAllConsents);

consentRoutes.post("/consents",authMiddleware, consentController.createConsent)

export default consentRoutes