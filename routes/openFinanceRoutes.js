import express from "express";
import accountController from "../controllers/accountController.js";
import customerController from "../controllers/customerController.js"
import consentController from "../controllers/consentController.js"
import authMiddleware from "../middleware/Auth.js"; 

const openFinanceRoutes = express.Router();

openFinanceRoutes.get("/openfinance/customers/:id",authMiddleware, customerController.getCustomer);

openFinanceRoutes.get("/openfinance/customers/:id/accounts",authMiddleware, customerController.getAccounts);

openFinanceRoutes.get("/openfinance/accounts/:id/balance",authMiddleware, accountController.getBalanceFromAccount);

openFinanceRoutes.get("/openfinance/accounts/:id/transactions",authMiddleware, accountController.getTransactionsFromAccount);

openFinanceRoutes.post("/openfinance/consents",authMiddleware, consentController.createConsent);

//Falta adicionar o service
openFinanceRoutes.get("/openfinance/consents/:id",authMiddleware, consentController.getConsentById);

openFinanceRoutes.delete("/openfinance/consents/:id",authMiddleware, consentController.deleteConsent);

export default openFinanceRoutes