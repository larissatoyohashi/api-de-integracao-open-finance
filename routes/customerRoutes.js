import express from "express";
const customerRoutes = express.Router();
import customerController from "../controllers/customerController.js";
import authMiddleware from "../middleware/Auth.js"; 


customerRoutes.get("/customers", authMiddleware, customerController.getAllCustomers);

customerRoutes.post("/customers", customerController.createCustomer)

customerRoutes.post("/login", customerController.loginCustomer);

export default customerRoutes