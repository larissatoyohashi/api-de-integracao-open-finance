import express from "express";
const accountRoutes = express.Router();
import accountController from "../controllers/accountController.js";
import authMiddleware from "../middleware/Auth.js"; // Mude de 'Auth' para 'authMiddleware' (ou o nome real)

accountRoutes.get("/accounts", authMiddleware, accountController.getAllaccounts);

accountRoutes.get("/accounts/:id/balance",  authMiddleware, accountController.getBalanceFromAccount)

accountRoutes.get("/accounts/:id/transactions",  authMiddleware, accountController.getTransactionsFromAccount)

accountRoutes.post("/accounts",  authMiddleware, accountController.createAccount);

export default accountRoutes