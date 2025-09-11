import express from "express";
const accountRoutes = express.Router();
import accountController from "../controllers/accountController.js";

accountRoutes.get("/accounts", accountController.getAllaccounts);

accountRoutes.post("/accounts", accountController.createAccount)

export default accountRoutes