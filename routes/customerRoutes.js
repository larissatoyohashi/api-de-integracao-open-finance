import express from "express";
const customerRoutes = express.Router();
import customerController from "../controllers/customerController.js";

customerRoutes.get("/customers", customerController.getAllCustomers);

customerRoutes.post("/customers", customerController.createCustomer)

customerRoutes.post("/login", customerController.loginCustomer);

export default customerRoutes