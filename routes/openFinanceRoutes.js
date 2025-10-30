import express from "express";
import accountController from "../controllers/accountController.js";
import customerController from "../controllers/customerController.js"
import consentController from "../controllers/consentController.js"
import authMiddleware from "../middleware/Auth.js"; 

const openFinanceRoutes = express.Router();

openFinanceRoutes.get("/openfinance/customers/:id", customerController.getCustomer);

openFinanceRoutes.get("/openfinance/customers/:id/accounts", customerController.getAccounts);

openFinanceRoutes.get("/openfinance/accounts/:id/balance", accountController.getBalanceFromAccount);

openFinanceRoutes.get("/openfinance/accounts/:id/transactions", accountController.getTransactionsFromAccount);

openFinanceRoutes.post("/openfinance/consents", consentController.createConsent);

//Falta adicionar o service
openFinanceRoutes.get("/openfinance/consents/:id", consentController.getConsentById);

openFinanceRoutes.delete("/openfinance/consents/:id", consentController.deleteConsent);

export default openFinanceRoutes