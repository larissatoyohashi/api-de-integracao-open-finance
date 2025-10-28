import express from "express";
const transactionRoutes = express.Router();
import transactionController from "../controllers/transactionController.js";
import authMiddleware from "../middleware/Auth.js"; 


transactionRoutes.get("/transactions", authMiddleware, transactionController.getAllTransactions);

transactionRoutes.post("/transactions", authMiddleware, transactionController.createTransaction);

transactionRoutes.get("/transactions/:id", authMiddleware, transactionController.getAllTransactionsFromAccount)

export default transactionRoutes