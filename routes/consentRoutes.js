import express from "express";
const consentRoutes = express.Router();
import consentController from "../controllers/consentController.js";

consentRoutes.get("/consents", consentController.getAllConsents);

consentRoutes.post("/consents", consentController.createConsent)

export default consentRoutes