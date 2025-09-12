import express from "express";
const accountRoutes = express.Router();
import accountController from "../controllers/accountController.js";

accountRoutes.get("/accounts", accountController.getAllaccounts);

accountRoutes.get("/accounts/:id/balance", accountController.getBalanceFromAccount)

accountRoutes.post("/accounts", accountController.createAccount);

export default accountRoutes