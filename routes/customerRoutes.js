import express from "express";
const customerRoutes = express.Router();
import customerController from "../controllers/customerController.js";

customerRoutes.get("/customers", customerController.getAllcustomers);

customerRoutes.post("/customers", customerController.createCustomer)

export default customerRoutes