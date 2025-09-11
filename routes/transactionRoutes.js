import express from "express";
const transactionRoutes = express.Router();
import transactionController from "../controllers/transactionController.js";

transactionRoutes.get("/transactions", transactionController.getAllTransactions);

transactionRoutes.post("/transactions", transactionController.createTransaction);

export default transactionRoutes